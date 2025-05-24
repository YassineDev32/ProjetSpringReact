import React, { useState, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import PaymentForm from "../components/PaymentForm/PaymentForm";
import api from "../api";
import { useParams } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51NTZcAQ9TKLySsRyy7FuUxTcobeFmz5z6ErBv1EIJbDZrGUahGw5zQUUGJujhqBcD93iYt0wX8O0MDvmGCOE3iN8006S7wrP2P"
);

export default function CheckoutPage() {
  const { reservationId } = useParams();
  const [reservation, setReservation] = useState(null);
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservationData = async () => {
      try {
        const reservationResponse = await api.get(
          `/api/reservations/${reservationId}`
        );
        setReservation(reservationResponse.data);
        const invoiceResponse = await api.get(
          `/api/invoices/reservation/${reservationId}`
        );
        setInvoice(invoiceResponse.data);
      } catch (err) {
        console.error("Failed to fetch reservation data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReservationData();
  }, [reservationId]);

  if (loading) return <p>Loading reservation and invoice...</p>;

  return (
    <div className="min-h-screen flex items-center text-black justify-center bg-white py-12 px-4 sm:px-6">
      <div className="max-w-7xl w-full p-12 rounded-lg grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Left Section */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h1 className="text-4xl font-bold mb-8 text-gray-800">Checkout</h1>
          <div className="space-y-8">
            {/* Reservation Details */}
            <div className="p-4 bg-white rounded-md shadow-sm border border-gray-200">
              <h2 className="font-semibold text-2xl text-indigo-600 mb-4">
                Reservation Details
              </h2>
              <p className="text-gray-700 mb-2">
                <strong>Reservation Number:</strong> {reservation.id}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Car:</strong> {reservation.car.model.name}{" "}
                {reservation.car.model.mark.name}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Start Date:</strong> {reservation.startDate}
              </p>
              <p className="text-gray-700 mb-2">
                <strong>End Date:</strong> {reservation.endDate}
              </p>
              <p className="text-gray-700">
                <strong>Status:</strong>{" "}
                <span
                  className={`px-2 py-1 rounded-full text-white ${
                    reservation.status === "Confirmed"
                      ? "bg-red-300"
                      : "bg-green-300"
                  }`}
                >
                  {reservation.status}
                </span>
              </p>
            </div>

            {/* Invoice Details */}
            <div className="p-4 bg-white rounded-md shadow-sm border border-gray-200">
              <h2 className="font-semibold text-2xl text-indigo-600 mb-4">
                Invoice Details
              </h2>
              <p className="text-gray-700 text-lg">
                <strong>Total Amount:</strong>{" "}
                <span className="text-green-600 font-bold">
                  د.م. {invoice ? invoice.totalAmount : "N/A"} MAD
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="p-6 bg-gray-50 rounded-lg border shadow-md">
          <h2 className="font-semibold text-xl mb-4 text-center">Payment</h2>
          <Elements stripe={stripePromise}>
            <PaymentForm
              reservationId={reservation.id}
              totalAmount={invoice ? invoice.totalAmount : 0}
            />
          </Elements>
        </div>
      </div>
    </div>
  );
}
