import { initStripe } from '@stripe/stripe-react-native';

export const STRIPE_CONFIG = {
  publishableKey: 'pk_test_51NTZcAQ9TKLySsRyy7FuUxTcobeFmz5z6ErBv1EIJbDZrGUahGw5zQUUGJujhqBcD93iYt0wX8O0MDvmGCOE3iN8006S7wrP2P', // Replace with your Stripe publishable key
  merchantIdentifier: 'merchant.com.yourcompany', // Optional: for Apple Pay
  urlScheme: 'your-app-scheme', // Your app's URL scheme
};

export const initializeStripe = async () => {
  try {
    await initStripe({
      publishableKey: STRIPE_CONFIG.publishableKey,
      merchantIdentifier: STRIPE_CONFIG.merchantIdentifier,
      urlScheme: STRIPE_CONFIG.urlScheme,
    });
    console.log('Stripe initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Stripe:', error);
  }
}; 