import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { getToken } from '../../utils/auth';
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

export default function EditProfileScreen() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form fields
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [numeroTel, setNumeroTel] = useState('');
  const [cin, setCin] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');

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
      // Set form fields
      setFirstname(response.data.firstname || '');
      setLastname(response.data.lastname || '');
      setNumeroTel(response.data.numeroTel || '');
      setCin(response.data.cin || '');
      setUsername(response.data.username || '');
      setEmail(response.data.email || '');
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

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);

      const token = await getToken();
      if (!token) {
        setError("Please login to update your profile");
        return;
      }

      // Validate form
      if (!firstname.trim() || !lastname.trim() || !email.trim() || !username.trim()) {
        setError("Please fill in all required fields");
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setError("Please enter a valid email address");
        return;
      }

      const response = await axios.put(
        `${API_URL}/user/update`,
        {
          firstname,
          lastname,
          numeroTel,
          cin,
          username,
          email,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        }
      );

      if (response.status === 200) {
        Alert.alert(
          "Success",
          "Profile updated successfully",
          [
            {
              text: "OK",
              onPress: () => router.back()
            }
          ]
        );
      }
    } catch (err) {
      console.error("Failed to update profile", err);
      setError("Failed to update profile. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordReset = async () => {
    try {
      setSaving(true);
      setError(null);

      const response = await axios.post(
        `${API_URL}/auth/request-password-reset`,
        { email },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
        }
      );

      if (response.status === 200) {
        // Extract token from the response
        const resetToken = response.data.token;
        
        // Navigate to reset password screen with the token
        router.push({
          pathname: '/profile/reset-password',
          params: { token: resetToken }
        });
      }
    } catch (err) {
      console.error("Password reset failed", err);
      setError("Failed to send password reset instructions. Please try again.");
    } finally {
      setSaving(false);
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
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => router.back()} 
            style={styles.backButton}
          >
            <FontAwesome name="arrow-left" size={24} color="#007bff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profile</Text>
        </View>

        {/* Form */}
        <View style={styles.form}>
          {error && (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}

          <View style={styles.inputGroup}>
            <Text style={styles.label}>First Name *</Text>
            <TextInput
              style={styles.input}
              value={firstname}
              onChangeText={setFirstname}
              placeholder="Enter your first name"
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Last Name *</Text>
            <TextInput
              style={styles.input}
              value={lastname}
              onChangeText={setLastname}
              placeholder="Enter your last name"
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number</Text>
            <TextInput
              style={styles.input}
              value={numeroTel}
              onChangeText={setNumeroTel}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>CIN</Text>
            <TextInput
              style={styles.input}
              value={cin}
              onChangeText={setCin}
              placeholder="Enter your CIN"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Username *</Text>
            <TextInput
              style={styles.input}
              value={username}
              onChangeText={setUsername}
              placeholder="Enter your username"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email *</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[styles.saveButton, saving && styles.saveButtonDisabled]}
              onPress={handleSave}
              disabled={saving}
            >
              {saving ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <>
                  <FontAwesome name="save" size={20} color="white" style={styles.saveButtonIcon} />
                  <Text style={styles.saveButtonText}>Save Changes</Text>
                </>
              )}
            </TouchableOpacity>

            <TouchableOpacity 
              style={[styles.resetButton, saving && styles.resetButtonDisabled]}
              onPress={handlePasswordReset}
              disabled={saving}
            >
              {saving ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <>
                  <FontAwesome name="key" size={20} color="white" style={styles.resetButtonIcon} />
                  <Text style={styles.resetButtonText}>Reset Password</Text>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
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
  form: {
    padding: 16,
  },
  errorContainer: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#FEE2E2',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  errorText: {
    color: '#DC2626',
    fontSize: 14,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },
  saveButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  saveButtonDisabled: {
    backgroundColor: '#94a3b8',
  },
  saveButtonIcon: {
    marginRight: 8,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resetButton: {
    backgroundColor: '#dc3545',
    borderRadius: 8,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginLeft: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resetButtonDisabled: {
    backgroundColor: '#94a3b8',
  },
  resetButtonIcon: {
    marginRight: 8,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 