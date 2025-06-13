import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  Modal,
  Linking
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { getToken } from '../../utils/auth';
import * as FileSystem from 'expo-file-system';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiUrl } from '../../config/api';

const API_URL = getApiUrl();

type Booking = {
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
  createdAt: string;
};

export default function BookingsScreen() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [userData, setUserData] = useState<any>(null);

  const fetchUserData = async () => {
    try {
      const token = await getToken();
      if (!token) {
        setError("Please login to view your bookings");
        return null;
      }

      // Decode JWT token to get username
      const tokenParts = token.split('.');
      const payload = JSON.parse(atob(tokenParts[1]));
      const username = payload.sub;
      console.log('Username from token:', username);

      const response = await axios.get(
        `${API_URL}/user/${username}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        }
      );
      setUserData(response.data);
      return response.data;
    } catch (err) {
      console.error("Failed to fetch user data", err);
      setError("Unable to fetch user data.");
      return null;
    }
  };

  const fetchBookings = async () => {
    try {
      const token = await getToken();
      if (!token) {
        setError("Please login to view your bookings");
        return;
      }

      // Get user data first
      const user = await fetchUserData();
      if (!user) {
        setError("Unable to fetch user data");
        return;
      }

      // Now fetch bookings with the user ID
      const response = await axios.get(
        `${API_URL}/api/reservations/mesreservations/${user.id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        }
      );
      setBookings(response.data);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError("Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  const fetchInvoice = async (reservationId: number) => {
    try {
      const token = await getToken();
      if (!token) return;

      const response = await axios.get(`${API_URL}/api/invoices/reservation/${reservationId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setInvoice(response.data);
    } catch (err) {
      console.error('Error fetching invoice:', err);
    }
  };

  const handleDownloadContract = async (reservationId: number) => {
    try {
      const token = await getToken();
      if (!token) {
        Alert.alert('Error', 'Please login to download the contract');
        return;
      }

      setLoading(true);
      const response = await axios.get(
        `${API_URL}/api/contracts/${reservationId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/pdf',
            'Content-Type': 'application/json'
          },
          responseType: 'blob'
        }
      );

      // Create a temporary file path
      const fileUri = `${FileSystem.cacheDirectory}contract_${reservationId}.pdf`;
      
      // Convert blob to base64
      const reader = new FileReader();
      reader.readAsDataURL(response.data);
      reader.onloadend = async () => {
        const base64data = reader.result?.toString().split(',')[1];
        if (base64data) {
          try {
            // Write the file
            await FileSystem.writeAsStringAsync(fileUri, base64data, {
              encoding: FileSystem.EncodingType.Base64
            });

            // Check if file exists
            const fileInfo = await FileSystem.getInfoAsync(fileUri);
            if (fileInfo.exists) {
              // Open the PDF
              const canOpen = await Linking.canOpenURL(fileUri);
              if (canOpen) {
                await Linking.openURL(fileUri);
                Alert.alert(
                  'Success',
                  'Contract downloaded successfully!',
                  [{ text: 'OK' }]
                );
              } else {
                Alert.alert(
                  'Error',
                  'Cannot open PDF file. Please make sure you have a PDF viewer installed.',
                  [{ text: 'OK' }]
                );
              }
            } else {
              Alert.alert(
                'Error',
                'Failed to save the contract. Please try again.',
                [{ text: 'OK' }]
              );
            }
          } catch (error) {
            console.error('Error saving or opening file:', error);
            Alert.alert(
              'Error',
              'Failed to save or open the contract. Please try again.',
              [{ text: 'OK' }]
            );
          }
        }
      };
    } catch (err: any) {
      console.error('Error downloading contract:', err);
      if (err.response?.status === 403) {
        Alert.alert(
          'Authentication Error',
          'Your session has expired. Please login again.',
          [
            { 
              text: 'OK',
              onPress: () => {
                // Navigate to login screen or refresh token
                router.push('/login');
              }
            }
          ]
        );
      } else {
        Alert.alert(
          'Error',
          'Failed to download contract. Please try again.',
          [{ text: 'OK' }]
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      // Clear the token from AsyncStorage
      await AsyncStorage.removeItem('token');
      // Navigate to login screen
      router.replace('/login');
    } catch (error) {
      console.error('Logout failed:', error);
      Alert.alert('Error', 'Failed to logout. Please try again.');
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return '#28a745';
      case 'Pending':
        return '#ffc107';
      case 'Cancelled':
        return '#dc3545';
      default:
        return '#6c757d';
    }
  };

  const handleViewDetails = (booking: Booking) => {
    setSelectedBooking(booking);
    fetchInvoice(booking.id);
    setShowModal(true);
  };

  const handleCancelBooking = async (id: number) => {
    try {
      const token = await getToken();
      if (!token) return;

      await axios.put(
        `${API_URL}/api/reservations/cancel/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setBookings(prevBookings =>
        prevBookings.map(booking =>
          booking.id === id ? { ...booking, status: 'CANCELLED' } : booking
        )
      );

      setShowModal(false);
      Alert.alert('Success', 'Booking cancelled successfully');
    } catch (err: any) {
      Alert.alert('Error', err.response?.data?.message || 'Failed to cancel booking');
    }
  };

  const handlePayBooking = (id: number) => {
    router.push(`/payment/${id}`);
    setShowModal(false);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={styles.backButton}
        >
          <FontAwesome name="arrow-left" size={24} color="#007bff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Bookings</Text>
      </View>

      {error ? (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton}
            onPress={fetchBookings}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      ) : bookings.length === 0 ? (
        <View style={styles.emptyContainer}>
          <FontAwesome name="calendar-times-o" size={64} color="#9ca3af" />
          <Text style={styles.emptyText}>No bookings found</Text>
        </View>
      ) : (
        <ScrollView style={styles.bookingsList}>
          {bookings.map((booking) => {
            const startDate = new Date(booking.startDate);
            const endDate = new Date(booking.endDate);
            const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
            const totalAmount = days * booking.car.price;

            return (
              <TouchableOpacity
                key={booking.id}
                style={styles.bookingCard}
                onPress={() => handleViewDetails(booking)}
              >
                <View style={styles.bookingHeader}>
                  <Text style={styles.carName}>
                    {booking.car.model.mark.name} {booking.car.model.name}
                  </Text>
                  <Text
                    style={[
                      styles.status,
                      { color: getStatusColor(booking.status) },
                    ]}
                  >
                    {booking.status}
                  </Text>
                </View>

                <View style={styles.bookingDetails}>
                  <View style={styles.detailRow}>
                    <FontAwesome name="calendar" size={16} color="#666" />
                    <Text style={styles.detailText}>
                      {startDate.toLocaleDateString()} - {endDate.toLocaleDateString()}
                    </Text>
                  </View>

                  <View style={styles.detailRow}>
                    <FontAwesome name="money" size={16} color="#666" />
                    <Text style={styles.detailText}>
                      Total: {totalAmount} MAD
                    </Text>
                  </View>
                </View>

                {booking.status === 'CONFIRMED' && (
                  <>
                    <View style={styles.actionButtons}>
                      <TouchableOpacity
                        style={[styles.actionButton, styles.paymentButton]}
                        onPress={() => handlePayBooking(booking.id)}
                      >
                        <FontAwesome name="credit-card" size={16} color="white" />
                        <Text style={styles.actionButtonText}>Pay Now</Text>
                      </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                      style={styles.downloadButton}
                      onPress={() => handleDownloadContract(booking.id)}
                    >
                      <FontAwesome name="file-pdf-o" size={24} color="white" />
                      <Text style={styles.downloadButtonText}>Download Contract</Text>
                    </TouchableOpacity>
                  </>
                )}
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      )}

      <Modal
        visible={showModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedBooking && (
              <>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>Booking Details</Text>
                  <TouchableOpacity onPress={() => setShowModal(false)}>
                    <FontAwesome name="times" size={24} color="#000" />
                  </TouchableOpacity>
                </View>

                <ScrollView style={styles.modalBody}>
                  <View style={styles.detailSection}>
                    <Text style={styles.detailLabel}>Booking ID</Text>
                    <Text style={styles.detailValue}>#{selectedBooking.id}</Text>
                  </View>

                  <View style={styles.detailSection}>
                    <Text style={styles.detailLabel}>Car</Text>
                    <Text style={styles.detailValue}>
                      {selectedBooking.car.model.name} {selectedBooking.car.model.mark.name}
                    </Text>
                  </View>

                  <View style={styles.detailSection}>
                    <Text style={styles.detailLabel}>Dates</Text>
                    <Text style={styles.detailValue}>
                      {new Date(selectedBooking.startDate).toLocaleDateString()} - {new Date(selectedBooking.endDate).toLocaleDateString()}
                    </Text>
                  </View>

                  <View style={styles.detailSection}>
                    <Text style={styles.detailLabel}>Status</Text>
                    <View style={[styles.statusBadge, { backgroundColor: getStatusColor(selectedBooking.status) }]}>
                      <Text style={styles.statusText}>{selectedBooking.status}</Text>
                    </View>
                  </View>

                  {invoice && (
                    <View style={styles.detailSection}>
                      <Text style={styles.detailLabel}>Invoice Amount</Text>
                      <Text style={styles.detailValue}>{invoice.totalAmount} MAD</Text>
                    </View>
                  )}

                  {selectedBooking.status === 'CONFIRMED' && (
                    <View style={styles.detailSection}>
                      <TouchableOpacity
                        style={styles.downloadButton}
                        onPress={() => handleDownloadContract(selectedBooking.id)}
                      >
                        <FontAwesome name="file-pdf-o" size={24} color="white" />
                        <Text style={styles.downloadButtonText}>Download Contract</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </ScrollView>

                <View style={styles.modalFooter}>
                  {selectedBooking.status !== 'COMPLETED' && (
                    <>
                      <TouchableOpacity
                        style={[styles.modalButton, styles.cancelButton]}
                        onPress={() => handleCancelBooking(selectedBooking.id)}
                      >
                        <Text style={styles.buttonText}>Cancel</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={[styles.modalButton, styles.payButton]}
                        onPress={() => handlePayBooking(selectedBooking.id)}
                      >
                        <Text style={styles.buttonText}>Pay</Text>
                      </TouchableOpacity>
                    </>
                  )}
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#dc3545',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 16,
  },
  retryButton: {
    backgroundColor: '#007bff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    color: '#6b7280',
    marginTop: 16,
  },
  bookingsList: {
    flex: 1,
    padding: 16,
  },
  bookingCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  bookingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  carName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  bookingDetails: {
    gap: 8,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
    marginTop: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  actionButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  paymentButton: {
    backgroundColor: '#007bff',
  },
  contractButton: {
    backgroundColor: '#28a745',
    borderWidth: 2,
    borderColor: '#1e7e34',
  },
  buttonIcon: {
    marginRight: 8,
  },
  downloadButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
  },
  downloadButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  downloadIcon: {
    fontSize: 24,
    color: 'white',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 16,
    width: '90%',
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e7eb',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  modalBody: {
    padding: 16,
  },
  detailSection: {
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: '#1f2937',
    fontWeight: '500',
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  modalButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    minWidth: 100,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#ef4444',
  },
  payButton: {
    backgroundColor: '#007bff',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
}); 