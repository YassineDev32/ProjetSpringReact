import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';
import { getToken } from '../../utils/auth';
import { useRouter } from 'expo-router';
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

type RootStackParamList = {
  BookingDetails: { bookingId: number };
};

export default function HistoryScreen() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userData, setUserData] = useState<any>(null);
  const navigation = useNavigation<any>();
  const router = useRouter();

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
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchBookings();
  };

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

  const renderBookingItem = ({ item }: { item: Booking }) => {
    const startDate = new Date(item.startDate);
    const endDate = new Date(item.endDate);
    const days = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const totalAmount = days * item.car.price;

    const handlePress = () => {
      if (item.status === 'CONFIRMED') {
        router.push(`/payment/${item.id}`);
      } else {
        navigation.navigate('BookingDetails', { bookingId: item.id });
      }
    };

    return (
      <TouchableOpacity
        style={styles.bookingCard}
        onPress={handlePress}
      >
        <View style={styles.bookingHeader}>
          <Text style={styles.carName}>
            {item.car.model.name} {item.car.model.mark.name}
          </Text>
          <Text
            style={[
              styles.status,
              { color: getStatusColor(item.status) },
            ]}
          >
            {item.status}
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
      </TouchableOpacity>
    );
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
      <FlatList
        data={bookings}
        renderItem={renderBookingItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No bookings found</Text>
          </View>
        }
      />
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
  listContainer: {
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
  },
}); 