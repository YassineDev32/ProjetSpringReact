import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import axios from 'axios';
import { getToken } from '../utils/auth';

const API_URL = 'http://172.20.10.4:8080';

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

export default function BookingDetailsScreen() {
  const router = useRouter();
  const { bookingId } = useLocalSearchParams();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookingDetails = async () => {
    try {
      const token = await getToken();
      if (!token) {
        setError("Please login to view booking details");
        return;
      }

      const response = await axios.get(
        `${API_URL}/api/reservations/${bookingId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        }
      );
      setBooking(response.data);
    } catch (err) {
      console.error("Failed to fetch booking details", err);
      setError("Unable to fetch booking details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookingDetails();
  }, [bookingId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity 
          style={styles.retryButton}
          onPress={fetchBookingDetails}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()} 
          style={styles.backButton}
        >
          <FontAwesome name="arrow-left" size={24} color="#007bff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Booking Details</Text>
      </View>

      <ScrollView style={styles.content}>
        {booking && (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Car Information</Text>
              <Text style={styles.detailText}>
                {booking.car.model.mark.name} {booking.car.model.name}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Dates</Text>
              <Text style={styles.detailText}>
                From: {new Date(booking.startDate).toLocaleDateString()}
              </Text>
              <Text style={styles.detailText}>
                To: {new Date(booking.endDate).toLocaleDateString()}
              </Text>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Status</Text>
              <Text style={[styles.statusText, { color: booking.status === 'CONFIRMED' ? '#28a745' : '#dc3545' }]}>
                {booking.status}
              </Text>
            </View>
          </>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  },
  content: {
    flex: 1,
    padding: 16,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 16,
    color: '#495057',
    marginBottom: 4,
  },
  statusText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 