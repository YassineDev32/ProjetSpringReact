import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StatusBar,
  TextInput,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import axios from 'axios';
import { getToken, clearAuth } from '../../utils/auth';

const API_URL = 'http://172.20.10.4:8080';

type Car = {
  id: number;
  model: {
    name: string;
    mark: {
      name: string;
    };
  };
  price: number;
  pricePerDay: number;
};

export default function NewReservationScreen() {
  const { carId } = useLocalSearchParams();
  const router = useRouter();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [totalAmount, setTotalAmount] = useState(0);
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    fetchCarDetails();
  }, [carId]);

  useEffect(() => {
    calculateTotalAmount();
  }, [startDate, endDate, car]);

  const fetchCarDetails = async () => {
    try {
      const token = await getToken();
      if (!token) {
        console.log('No valid token found, redirecting to login');
        router.replace('/Login');
        return;
      }

      const response = await axios.get(`${API_URL}/api/cars/${carId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCar(response.data);
    } catch (error: any) {
      console.error('Error fetching car details:', error.response?.status, error.response?.data);
      if (error.response?.status === 401 || error.response?.status === 403) {
        // Token is invalid or expired
        await clearAuth();
        router.replace('/Login');
      } else {
        Alert.alert(
          'Error',
          'Failed to load car details. Please try again.',
          [
            {
              text: 'OK',
              onPress: () => router.back()
            }
          ]
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const calculateTotalAmount = () => {
    if (!car) return;

    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    if (days > 0) {
      setTotalAmount(days * car.price);
    } else {
      setTotalAmount(0);
    }
  };

  const handleStartDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowStartDatePicker(false);
    if (selectedDate) {
      setStartDate(selectedDate);
    }
  };

  const handleEndDateChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    setShowEndDatePicker(false);
    if (selectedDate) {
      setEndDate(selectedDate);
    }
  };

  const handleReserve = async () => {
    try {
      const token = await getToken();
      if (!token) {
        Alert.alert('Error', 'Please login to make a reservation');
        router.push('/Login');
        return;
      }

      if (startDate >= endDate) {
        Alert.alert('Error', 'End date must be after start date');
        return;
      }

      if (!phone || !address) {
        Alert.alert('Error', 'Please provide your phone number and address');
        return;
      }

      // Decode the JWT token to get username
      const tokenParts = token.split('.');
      const payload = JSON.parse(atob(tokenParts[1]));
      const username = payload.sub;

      // Get user ID from username
      const userResponse = await axios.get(
        `${API_URL}/user/${username}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      const userId = userResponse.data.id;

      const requestBody = {
        carId: Number(carId),
        userId: userId,
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0],
        status: 'PENDING',
        phone: phone,
        address: address
      };

      const response = await axios.post(
        `${API_URL}/api/reservations`,
        requestBody,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      Alert.alert(
        'Success',
        'Reservation created successfully',
        [
          {
            text: 'OK',
            onPress: () => router.push('/(tabs)/history'),
          },
        ]
      );
    } catch (error: any) {
      console.error('Error creating reservation:', error.response?.status, error.response?.data);
      
      if (error.response?.status === 401) {
        await clearAuth();
        router.replace('/Login');
      } else {
        Alert.alert(
          'Error',
          'Failed to create reservation. Please try again.'
        );
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <FontAwesome name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New Reservation</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.content}>
          <View style={styles.carInfo}>
            <Text style={styles.carName}>
              {car?.model.name} {car?.model.mark.name}
            </Text>
            <Text style={styles.carPrice}>{car?.price} MAD/day</Text>
          </View>

          <View style={styles.dateSection}>
            <Text style={styles.sectionTitle}>Select Dates</Text>

            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setShowStartDatePicker(true)}
            >
              <FontAwesome name="calendar" size={20} color="#666" />
              <Text style={styles.dateText}>
                Start Date: {startDate.toLocaleDateString()}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => setShowEndDatePicker(true)}
            >
              <FontAwesome name="calendar" size={20} color="#666" />
              <Text style={styles.dateText}>
                End Date: {endDate.toLocaleDateString()}
              </Text>
            </TouchableOpacity>

            {showStartDatePicker && (
              <DateTimePicker
                value={startDate}
                mode="date"
                display="default"
                onChange={handleStartDateChange}
                minimumDate={new Date()}
              />
            )}

            {showEndDatePicker && (
              <DateTimePicker
                value={endDate}
                mode="date"
                display="default"
                onChange={handleEndDateChange}
                minimumDate={startDate}
              />
            )}
          </View>

          <View style={styles.contactSection}>
            <Text style={styles.sectionTitle}>Contact Information</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Phone Number</Text>
              <View style={styles.inputWrapper}>
                <FontAwesome name="phone" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your phone number"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />
              </View>
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Address</Text>
              <View style={styles.inputWrapper}>
                <FontAwesome name="map-marker" size={20} color="#666" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="Enter your address"
                  value={address}
                  onChangeText={setAddress}
                  multiline
                />
              </View>
            </View>
          </View>

          <View style={styles.summarySection}>
            <Text style={styles.sectionTitle}>Reservation Summary</Text>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Duration:</Text>
              <Text style={styles.summaryValue}>
                {Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24))} days
              </Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Price per day:</Text>
              <Text style={styles.summaryValue}>{car?.pricePerDay} MAD</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.summaryLabel}>Total amount:</Text>
              <Text style={styles.summaryValue}>{totalAmount} MAD</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.reserveButton}
            onPress={handleReserve}
          >
            <Text style={styles.reserveButtonText}>Confirm Reservation</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 8,
    marginRight: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 16,
  },
  carInfo: {
    marginBottom: 24,
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  carName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  carPrice: {
    fontSize: 18,
    color: '#007bff',
    fontWeight: '600',
  },
  dateSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  dateInput: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  dateText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#444',
  },
  summarySection: {
    marginBottom: 24,
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  reserveButton: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  reserveButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactSection: {
    marginBottom: 24,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#4b5563',
    marginBottom: 8,
    fontWeight: '500',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 12,
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
    color: '#1f2937',
  },
}); 