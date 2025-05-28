import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Image,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { getToken } from '../../utils/auth';
import { FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { CardField, useStripe, useConfirmPayment } from '@stripe/stripe-react-native';
import { STRIPE_CONFIG, initializeStripe } from '../../config/stripe';

const API_URL = 'http://172.20.10.4:8080';

type Reservation = {
  id: number;
  car: {
    model: {
      name: string;
      mark: {
        name: string;
      };
    };
    price: number;
  };
  status: string;
  startDate: string;
  endDate: string;
};

type Invoice = {
  id: number;
  totalAmount: number;
  status: string;
};

export default function PaymentPage() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [reservation, setReservation] = useState<Reservation | null>(null);
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const { confirmPayment } = useConfirmPayment();

  useEffect(() => {
    const initialize = async () => {
      try {
        await initializeStripe();
        await fetchData();
      } catch (err) {
        console.error('Failed to initialize:', err);
        setError('Failed to initialize payment system');
      }
    };

    initialize();
  }, []);

  const fetchData = async () => {
    try {
      const token = await getToken();
      if (!token) {
        setError("Please login to view payment details");
        return;
      }

      const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      };

      // Fetch reservation details
      const reservationResponse = await axios.get(
        `${API_URL}/api/reservations/${id}`,
        { headers }
      );
      setReservation(reservationResponse.data);

      // Fetch invoice details
      const invoiceResponse = await axios.get(
        `${API_URL}/api/invoices/reservation/${id}`,
        { headers }
      );
      setInvoice(invoiceResponse.data);
    } catch (err) {
      console.error("Failed to fetch data:", err);
      setError("Failed to load payment details");
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    try {
      const token = await getToken();
      if (!token) {
        setError("Please login to make payment");
        return;
      }

      setIsProcessing(true);
      setError(null);

      const amountInCents = Math.abs(invoice?.totalAmount || 0) * 100;

      // Step 1: Create a PaymentIntent
      const response = await axios.post(
        `${API_URL}/api/payments/create`,
        { 
          amount: amountInCents,
          currency: 'mad',
          payment_method_types: ['card']
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        }
      );

      const paymentIntent = response.data;

      if (!paymentIntent.clientSecret) {
        throw new Error('No client secret received from server');
      }

      // Step 2: Confirm the payment with Stripe
      const { error: stripeError, paymentIntent: confirmedPaymentIntent } = await confirmPayment(
        paymentIntent.clientSecret,
        {
          paymentMethodType: 'Card',
          paymentMethodData: {
            billingDetails: {
              email: 'customer@example.com', // You might want to get this from user data
            },
          },
        }
      );

      if (stripeError) {
        setError(stripeError.message);
        setIsProcessing(false);
        return;
      }

      if (confirmedPaymentIntent.status === 'Succeeded') {
        // Step 3: Notify the backend about the successful payment
        const method = 'CREDIT_CARD';
        const paymentNotificationResponse = await axios.post(
          `${API_URL}/api/reservations/${id}/pay?method=${method}`,
          {},
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
              'Accept': 'application/json'
            },
          }
        );

        if (paymentNotificationResponse.status === 200) {
          Alert.alert(
            'Success',
            'Payment completed successfully!',
            [
              {
                text: 'OK',
                onPress: () => router.push('/success-payment'),
              },
            ]
          );
        } else {
          Alert.alert(
            'Warning',
            'Payment was successful, but failed to update status in the backend.'
          );
        }
      } else {
        setError('Payment failed');
      }
    } catch (err: any) {
      console.error('Payment error:', err);
      if (err.response?.status === 401) {
        setError('Your session has expired. Please login again.');
      } else {
        setError(err.response?.data?.message || 'Failed to process payment. Please try again.');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const getErrorMessage = (error: string) => {
    // Map common Stripe error codes to user-friendly messages
    const errorMessages: { [key: string]: { message: string; icon: string } } = {
      'card_declined': {
        message: 'Your card was declined. Please check your card details or try another card.',
        icon: 'credit-card'
      },
      'insufficient_funds': {
        message: 'Your card has insufficient funds. Please use a different card or add funds to your account.',
        icon: 'money'
      },
      'expired_card': {
        message: 'Your card has expired. Please update your card information or use a different card.',
        icon: 'calendar-times-o'
      },
      'invalid_card': {
        message: 'The card number appears to be invalid. Please double-check and try again.',
        icon: 'exclamation-triangle'
      },
      'processing_error': {
        message: 'We encountered an issue processing your card. Please try again in a moment.',
        icon: 'refresh'
      },
      'rate_limit': {
        message: 'Too many attempts. Please wait a moment before trying again.',
        icon: 'clock-o'
      },
      'invalid_request': {
        message: 'Please check your payment information and try again.',
        icon: 'pencil'
      },
      'authentication_required': {
        message: 'Your card requires additional verification. Please try again and follow the prompts.',
        icon: 'lock'
      },
      'Please login to make payment': {
        message: 'Please sign in to your account to complete the payment.',
        icon: 'sign-in'
      },
      'Failed to process payment': {
        message: 'We couldn\'t process your payment. Please check your connection and try again.',
        icon: 'wifi'
      },
      'Your session has expired': {
        message: 'Your session has expired. Please login again to continue.',
        icon: 'sign-out'
      }
    };

    // Check if we have a specific message for this error
    for (const [key, value] of Object.entries(errorMessages)) {
      if (error.toLowerCase().includes(key.toLowerCase())) {
        return value;
      }
    }

    // Default error message
    return {
      message: 'An unexpected error occurred. Please try again.',
      icon: 'exclamation-circle'
    };
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView style={styles.scrollView}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity 
              onPress={() => router.back()} 
              style={styles.backButton}
            >
              <FontAwesome name="arrow-left" size={24} color="#007bff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Payment</Text>
          </View>

          {error ? (
            <View style={styles.errorContainer}>
              <FontAwesome 
                name={getErrorMessage(error).icon} 
                size={24} 
                color="#dc3545" 
                style={styles.errorIcon}
              />
              <Text style={styles.errorText}>{getErrorMessage(error).message}</Text>
              <TouchableOpacity 
                style={styles.retryButton}
                onPress={() => setError(null)}
              >
                <Text style={styles.retryButtonText}>Try Again</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <>
              {/* Reservation Details */}
              <View style={styles.reservationCard}>
                <View style={styles.reservationHeader}>
                  <MaterialIcons name="directions-car" size={24} color="#28a745" />
                  <Text style={styles.reservationTitle}>Reservation Details</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.carDetails}>
                  <Text style={styles.carName}>
                    {reservation?.car.model.mark.name} {reservation?.car.model.name}
                  </Text>
                  <View style={styles.dateContainer}>
                    <View style={styles.dateRow}>
                      <FontAwesome name="calendar" size={16} color="#666" />
                      <Text style={styles.dateText}>
                        {new Date(reservation?.startDate || '').toLocaleDateString()} - {new Date(reservation?.endDate || '').toLocaleDateString()}
                      </Text>
                    </View>
                  </View>
                </View>
              </View>

              {/* Payment Details */}
              <View style={styles.paymentCard}>
                <View style={styles.paymentHeader}>
                  <MaterialIcons name="payment" size={24} color="#28a745" />
                  <Text style={styles.paymentTitle}>Payment Details</Text>
                </View>

                <View style={styles.divider} />

                <View style={styles.amountDetails}>
                  <View style={styles.amountRow}>
                    <Text style={styles.amountLabel}>Daily Rate</Text>
                    <Text style={styles.amountValue}>{reservation?.car.price} MAD</Text>
                  </View>
                  <View style={styles.amountRow}>
                    <Text style={styles.amountLabel}>Number of Days</Text>
                    <Text style={styles.amountValue}>
                      {Math.ceil(
                        (new Date(reservation?.endDate || '').getTime() -
                          new Date(reservation?.startDate || '').getTime()) /
                          (1000 * 60 * 60 * 24)
                      )}
                    </Text>
                  </View>
                  <View style={[styles.amountRow, styles.totalRow]}>
                    <Text style={styles.totalLabel}>Total Amount</Text>
                    <Text style={styles.totalValue}>{invoice?.totalAmount} MAD</Text>
                  </View>
                </View>

                {/* Stripe Card Field */}
                <View style={styles.cardFieldContainer}>
                  <CardField
                    postalCodeEnabled={false}
                    placeholder={{
                      number: '4242 4242 4242 4242',
                    }}
                    cardStyle={{
                      backgroundColor: '#FFFFFF',
                      textColor: '#000000',
                    }}
                    style={styles.cardField}
                  />
                </View>

                {/* Pay Button */}
                <TouchableOpacity
                  style={[styles.payButton, isProcessing && styles.payButtonDisabled]}
                  onPress={handlePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <ActivityIndicator color="white" size="small" />
                  ) : (
                    <>
                      <FontAwesome name="credit-card" size={20} color="white" style={styles.payButtonIcon} />
                      <Text style={styles.payButtonText}>Pay Now</Text>
                    </>
                  )}
                </TouchableOpacity>
              </View>
            </>
          )}
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
    marginTop: 40,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e7f5ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#212529',
    flex: 1,
    textAlign: 'center',
    marginRight: 40,
  },
  errorContainer: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FEE2E2',
    borderRadius: 8,
    padding: 16,
    margin: 16,
    alignItems: 'center',
  },
  errorIcon: {
    marginBottom: 8,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#DC2626',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  reservationCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  reservationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  reservationTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginLeft: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#e5e7eb',
    marginVertical: 12,
  },
  carDetails: {
    marginBottom: 8,
  },
  carName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
    marginBottom: 8,
  },
  dateContainer: {
    marginTop: 8,
  },
  dateRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  dateText: {
    fontSize: 16,
    color: '#4b5563',
    marginLeft: 8,
  },
  paymentCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    margin: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  paymentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  paymentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
    marginLeft: 8,
  },
  amountDetails: {
    marginBottom: 16,
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  amountLabel: {
    fontSize: 16,
    color: '#4b5563',
  },
  amountValue: {
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '500',
  },
  totalRow: {
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#28a745',
  },
  cardFieldContainer: {
    marginBottom: 16,
  },
  cardField: {
    width: '100%',
    height: 50,
    marginVertical: 8,
  },
  payButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  payButtonDisabled: {
    backgroundColor: '#94a3b8',
  },
  payButtonIcon: {
    marginRight: 8,
  },
  payButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 