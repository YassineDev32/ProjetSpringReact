import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Dimensions,
  Alert,
} from 'react-native';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { getToken, clearAuth } from '../../utils/auth';
import { FontAwesome } from '@expo/vector-icons';

const API_URL = 'http://172.20.10.4:8080';
const { width } = Dimensions.get('window');

type Car = {
  id: number;
  model: { name: string; mark: { name: string } };
  price: number;
  available: boolean;
  imageUrl?: string;
  image: string;
  status: string;
};

type RootStackParamList = {
  'car/[id]': { id: number };
};

export default function HomeScreen() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const router = useRouter();

  const fetchCars = async () => {
    try {
      const token = await getToken();
      if (!token) {
        console.log('No valid token found, redirecting to login');
        router.replace('/Login');
        return;
      }

      const response = await axios.get(`${API_URL}/api/cars/`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCars(response.data);
    } catch (error: any) {
      console.error('Error fetching cars:', error.response?.status, error.response?.data);
      if (error.response?.status === 401 || error.response?.status === 403) {
        // Token is invalid or expired
        await clearAuth();
        router.replace('/Login');
      } else {
        // Other error
        Alert.alert(
          'Error',
          'Failed to load cars. Please try again.',
          [
            {
              text: 'OK',
              onPress: () => setLoading(false)
            }
          ]
        );
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchCars();
  };

  const renderCarItem = ({ item }: { item: Car }) => {
    const imageUri = `data:image/jpeg;base64,${item.image}`;
    
    return (
      <TouchableOpacity
        style={styles.carCard}
        onPress={() => router.push({
          pathname: '/car/[id]',
          params: { id: item.id }
        })}
      >
        <View style={styles.imageContainer}>
          {imageUri ? (
            <Image
              source={{ uri: imageUri }}
              style={styles.carImage}
              resizeMode="cover"
            />
          ) : (
            <View style={styles.placeholderImage}>
              <FontAwesome name="car" size={40} color="#ccc" />
            </View>
          )}
          {item.status !== 'Reser' && item.status !== 'entretien' && (
            <View style={styles.statusBadge}>
              <Text style={[
                styles.statusText,
                item.available ? styles.availableText : styles.unavailableText
              ]}>
                {item.status}
              </Text>
            </View>
          )}
        </View>
        
        <View style={styles.carInfo}>
          <Text style={styles.carName}>
            {item.model.mark.name} {item.model.name}
          </Text>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Price per day</Text>
            <Text style={styles.priceValue}>{item.price} MAD</Text>
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
        data={cars.filter(car => car.status !== 'RESERVED' && car.status !== 'ENENTRETIEN')}
        renderItem={renderCarItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
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
  listContainer: {
    padding: 16,
  },
  carCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    height: 200,
  },
  carImage: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  statusBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  availableText: {
    color: '#28a745',
  },
  unavailableText: {
    color: '#dc3545',
  },
  carInfo: {
    padding: 16,
  },
  carName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: 14,
    color: '#666',
  },
  priceValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#007bff',
  },
}); 