import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import api from "../../api";
import { useNavigate } from "react-router-dom";

function PaymentForm({ reservationId, totalAmount }) {
  const [amount] = useState(totalAmount); // Set the amount dynamically
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false); // State to track payment processing
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const token = localStorage.getItem("token");

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true); // Set processing state to true
    try {
      const amountInCents = Math.abs(amount) * 100; // Convert to positive if it's negative

      // Step 1: Create a PaymentIntent
      const response = await api.post(
        "/api/payments/create",
        { amount: amountInCents },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const paymentIntent = response.data;

      // Step 2: Confirm the payment with Stripe
      const { error: stripeError, paymentIntent: confirmedPaymentIntent } =
        await stripe.confirmCardPayment(paymentIntent.clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        });

      if (stripeError) {
        setError(stripeError.message);
        setIsProcessing(false); // Reset processing state on error
      } else if (confirmedPaymentIntent.status === "succeeded") {
        // Step 3: Notify the backend about the successful payment
        const method = "CREDIT_CARD";
        const paymentNotificationResponse = await api.post(
          `/api/reservations/${reservationId}/pay?method=${method}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (paymentNotificationResponse.status === 200) {
          console.log("Payment status updated successfully in the backend.");
          navigate("/success-payment"); // Redirect to success page
        } else {
          console.warn(
            "Payment was successful, but failed to update status in the backend."
          );
        }
        setIsProcessing(false); // Reset processing state on success
      } else {
        setError("Payment failed");
        setIsProcessing(false); // Reset processing state on failure
      }
    } catch (err) {
      setError("Failed to initiate payment. Please try again.");
      console.error(err);
      setIsProcessing(false); // Reset processing state on error
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 bg-white p-6 rounded-lg shadow-lg w-full max-w-lg mx-auto"
    >
      <div>
        <h3 className="text-xl font-semibold mb-4 text-gray-700">
          Payment Details
        </h3>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "18px",
                color: "#424770",
                letterSpacing: "0.025em",
                fontFamily: "Poppins, sans-serif",
                "::placeholder": {
                  color: "#9CA3AF",
                },
                padding: "10px 14px",
              },
              invalid: {
                color: "#E74C3C",
              },
            },
          }}
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
        <h4 className="text-lg font-medium mb-2">Reservation Summary</h4>
        <p className="text-sm text-gray-600">
          <strong>Reservation ID:</strong> {reservationId}
        </p>
        <p className="text-sm text-gray-600">
          <strong>Total Amount:</strong> د.م. {amount}
        </p>
      </div>

      {error && (
        <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg">
          {error}
        </div>
      )}

      <div className="text-center">
        <button
          type="submit"
          disabled={!stripe || isProcessing} // Disable button while processing
          className={`w-full px-6 py-3 rounded-lg shadow-md focus:outline-none focus:ring-2 transition duration-200 ${
            isProcessing
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-indigo-600 text-white hover:bg-indigo-700"
          }`}
        >
          {isProcessing ? "Payment Processing..." : `Pay د.م. ${amount}`}
        </button>
      </div>
    </form>
  );
}

export default PaymentForm;
