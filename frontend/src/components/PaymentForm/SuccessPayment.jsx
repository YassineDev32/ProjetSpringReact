import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa"; // Icon for success

const SuccessPayment = () => {
  const navigate = useNavigate();

  const handleReturnToMyBooking = () => {
    navigate("/mybooking"); // Navigate to My Booking page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-10 rounded-xl shadow-lg w-full max-w-md text-center">
        <div className="flex items-center justify-center mb-6">
          <FaCheckCircle className="text-green-500 text-8xl" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Payment Successful!
        </h2>
        <p className="text-gray-600 text-lg mb-8">
          Your payment has been successfully processed. The rental contract has
          been sent to your email.
        </p>
        <button
          onClick={handleReturnToMyBooking}
          className="bg-blue-600 text-white text-lg px-8 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
        >
          Return to My Booking
        </button>
      </div>
    </div>
  );
};

export default SuccessPayment;
