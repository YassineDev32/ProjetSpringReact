import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Alert,
} from 'react-native';
import axios from 'axios';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';
import { getToken, clearAuth } from '../../utils/auth';

const API_URL = 'http://172.20.10.4:8080';
const { width } = Dimensions.get('window');

type Car = {
  id: number;
  matricule: string;
  description: string;
  price: number;
  status: string;
  carState: string | null;
  seats: number;
  manual: boolean;
  airConditioning: boolean;
  fuelType: string;
  image: string;
  model: {
    id: number;
    name: string;
    mark: {
      id: number;
      name: string;
    };
  };
};

export default function CarDetailsScreen() {
  const { id } = useLocalSearchParams();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetchCarDetails();
  }, [id]);

  const fetchCarDetails = async () => {
    try {
      const token = await getToken();
      if (!token) {
        console.error('No valid authentication token found');
        router.replace('/Login');
        return;
      }
      
      const response = await axios.get(`${API_URL}/api/cars/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCar(response.data);
    } catch (error: any) {
      console.error('Error fetching car details:', error.response?.status, error.response?.data);
      if (error.response?.status === 403 || error.response?.status === 401) {
        // Token is invalid or expired
        await clearAuth();
        router.replace('/Login');
      } else {
        // Other error
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

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (!car) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Car not found</Text>
      </View>
    );
  }

  const imageUri = `data:image/jpeg;base64,${car.image}`;

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} bounces={false}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <FontAwesome name="arrow-left" size={20} color="#000" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Car Details</Text>
          <View style={styles.backButton} />
        </View>

        <View style={styles.imageContainer}>
          <Image
            source={{ uri: imageUri }}
            style={styles.carImage}
            resizeMode="cover"
          />
        </View>

        <View style={styles.content}>
          <View style={styles.titleSection}>
            <Text style={styles.carName}>
              {car.model.mark.name} {car.model.name}
            </Text>
            <Text style={styles.price}>{car.price} MAD/day</Text>
          </View>

          <View style={styles.specsContainer}>
            <View style={styles.specRow}>
              <View style={styles.specItem}>
                <FontAwesome name="car" size={20} color="#007bff" />
                <Text style={styles.specText}>{car.matricule}</Text>
              </View>
              <View style={styles.specItem}>
                <FontAwesome name="users" size={20} color="#007bff" />
                <Text style={styles.specText}>{car.seats} Seats</Text>
              </View>
            </View>
            <View style={styles.specRow}>
              <View style={styles.specItem}>
                <FontAwesome name="cog" size={20} color="#007bff" />
                <Text style={styles.specText}>
                  {car.manual ? 'Manual' : 'Automatic'}
                </Text>
              </View>
              <View style={styles.specItem}>
                <FontAwesome name="tint" size={20} color="#007bff" />
                <Text style={styles.specText}>{car.fuelType}</Text>
              </View>
            </View>
          </View>

          <View style={styles.featureContainer}>
            <Text style={styles.sectionTitle}>Features</Text>
            <View style={styles.featureItem}>
              <FontAwesome 
                name={car.airConditioning ? "snowflake-o" : "times"} 
                size={20} 
                color={car.airConditioning ? "#007bff" : "#dc3545"} 
              />
              <Text style={styles.featureText}>
                Air Conditioning {car.airConditioning ? '(Available)' : '(Not Available)'}
              </Text>
            </View>
          </View>

          <View style={styles.descriptionContainer}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{car.description}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.reserveButton}
          onPress={() => router.push({
            pathname: '/reservation/new',
            params: { carId: car.id }
          })}
        >
          <Text style={styles.reserveButtonText}>Reserve Now</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  imageContainer: {
    width: width,
    height: width * 0.6,
  },
  carImage: {
    width: '100%',
    height: '100%',
  },
  content: {
    padding: 20,
  },
  titleSection: {
    marginBottom: 20,
  },
  carName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    color: '#007bff',
    fontWeight: '600',
  },
  specsContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  specItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  specText: {
    fontSize: 16,
    color: '#333',
  },
  featureContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  featureText: {
    fontSize: 16,
    color: '#333',
  },
  descriptionContainer: {
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  footer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  reserveButton: {
    backgroundColor: '#007bff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  reserveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
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
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
}); 