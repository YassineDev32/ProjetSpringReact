import React from "react";
import { Link } from "react-router-dom";

const PasswordResetSent = () => {
  return (
    <div className="bg-white w-full px-6 py-8 mt-20 max-w-2xl mx-auto rounded-lg shadow-lg text-center">
      <h1 className="text-2xl font-bold text-indigo-900 mb-4">
        An email has been sent to reset your password.
      </h1>
      <p className="text-sm text-gray-600 mb-6">
        Please check your inbox and follow the instructions to reset your password.
      </p>
      <Link to="/" className="text-indigo-700 hover:text-indigo-900">
        Go back to Home
      </Link>
    </div>
  );
};

export default PasswordResetSent;
