import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { getToken } from '../../utils/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getApiUrl } from '../../config/api';

const API_URL = getApiUrl();

type User = {
  id: number;
  username: string;
  email: string;
  firstname: string;
  lastname: string;
  numeroTel: string;
  cin: string;
  role: string;
};

export default function ProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUserData = async () => {
    try {
      const token = await getToken();
      if (!token) {
        setError("Please login to view your profile");
        return;
      }

      const response = await axios.get(
        `${API_URL}/user/me`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        }
      );
      setUser(response.data);
    } catch (err) {
      console.error("Failed to fetch user data", err);
      setError("Unable to fetch user data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Logout",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('token');
              router.replace('/Login');
            } catch (err) {
              console.error("Logout failed", err);
              Alert.alert("Error", "Failed to logout. Please try again.");
            }
          }
        }
      ]
    );
  };

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
          onPress={fetchUserData}
        >
          <Text style={styles.retryButtonText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* User Info Section */}
      <View style={styles.userInfoSection}>
        <View style={styles.avatarContainer}>
          <FontAwesome name="user-circle" size={80} color="#007bff" />
        </View>
        <Text style={styles.userName}>{user?.firstname} {user?.lastname}</Text>
        <Text style={styles.userEmail}>{user?.email}</Text>
      </View>

      {/* Account Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => router.push('/profile/edit')}
        >
          <View style={styles.menuItemLeft}>
            <FontAwesome name="user" size={20} color="#007bff" />
            <Text style={styles.menuItemText}>Edit Profile</Text>
          </View>
          <FontAwesome name="chevron-right" size={16} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => router.push('/profile/change-password')}
        >
          <View style={styles.menuItemLeft}>
            <FontAwesome name="key" size={20} color="#007bff" />
            <Text style={styles.menuItemText}>Change Password</Text>
          </View>
          <FontAwesome name="chevron-right" size={16} color="#666" />
        </TouchableOpacity>
      </View>

      {/* History Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>History</Text>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => router.push('/profile/bookings')}
        >
          <View style={styles.menuItemLeft}>
            <FontAwesome name="calendar" size={20} color="#007bff" />
            <Text style={styles.menuItemText}>My Bookings</Text>
          </View>
          <FontAwesome name="chevron-right" size={16} color="#666" />
        </TouchableOpacity>        
      </View>

      {/* Logout Button */}
      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <FontAwesome name="sign-out" size={20} color="white" style={styles.logoutButtonIcon} />
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
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
  userInfoSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e7f5ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#6c757d',
  },
  section: {
    backgroundColor: 'white',
    marginTop: 16,
    paddingVertical: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#212529',
    padding: 16,
    paddingBottom: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    color: '#212529',
    marginLeft: 12,
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    margin: 16,
    padding: 16,
    borderRadius: 8,
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
  logoutButtonIcon: {
    marginRight: 8,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 