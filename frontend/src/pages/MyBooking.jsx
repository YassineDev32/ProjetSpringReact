import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import the useNavigate hook
import api from "../api"; // Assurez-vous que votre instance Axios est correctement configurée.
import DownloadContractButton from "../components/ContractPdf/DownloadContractButton";

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);
  const [selectedBooking, setSelectedBooking] = useState(null); // To manage selected booking for details modal
  const [showModal, setShowModal] = useState(false); // To toggle modal visibility
  const [invoice, setInvoice] = useState(null); // Store invoice data
  const navigate = useNavigate(); // Initialize useNavigate

  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("/user/me");
        setUserData(response.data);
      } catch (err) {
        console.error("Failed to fetch user data", err);
        setError("Unable to fetch user data.");
      }
    };

    fetchUserData();
  }, []);

  // Fetch bookings once userData is available
  useEffect(() => {
    if (userData) {
      const fetchBookings = async () => {
        try {
          const response = await api.get(
            `/api/reservations/mesreservations/${userData.id}`
          );
          setBookings(response.data);
        } catch (err) {
          console.error("Failed to fetch bookings", err);
          setError("Unable to fetch bookings. Please try again later.");
        } finally {
          setIsLoading(false);
        }
      };

      fetchBookings();
    }
  }, [userData]);

  // Fetch invoice when booking details are clicked
  const fetchInvoice = async (reservationId) => {
    try {
      const response = await api.get(
        `/api/invoices/reservation/${reservationId}`
      );
      setInvoice(response.data);
    } catch (err) {
      console.error("Failed to fetch invoice", err);
      setError("Unable to fetch invoice.");
    }
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    fetchInvoice(booking.id); // Fetch invoice for the selected booking
    setShowModal(true);
  };

  const handleCancelBooking = async (id) => {
    try {
      const token = localStorage.getItem("token");
      // Send cancel request
      await api.put(
        `/api/reservations/cancel/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update the state locally
      setBookings((prevBookings) =>
        prevBookings.map((booking) =>
          booking.id === id ? { ...booking, status: "CANCELLED" } : booking
        )
      );

      // Close the modal after cancellation
      setShowModal(false);
    } catch (error) {
      console.error("Error canceling reservation:", error);
      setError("Failed to cancel the booking. Please try again.");
    }
  };

  const handlePayBooking = (id) => {
    navigate(`/checkout/${id}`); // Navigate to the checkout page with the booking ID as a URL parameter
    setShowModal(false);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-700 px-2 py-1 rounded-full text-sm";
      case "PENDING":
        return "bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full text-sm";
      case "CANCELLED":
        return "bg-red-100 text-red-700 px-2 py-1 rounded-full text-sm";
      case "CONFIRMED":
        return "bg-green-300 text-green-900 px-2 py-1 rounded-full text-sm";
      default:
        return "bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm";
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen dark:text-black bg-gray-100 p-4 sm:p-6">
      <div className="w-auto mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-center">
          My Booking
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Reservation Number</th>
                <th className="py-2 px-4 border-b">Start Date</th>
                <th className="py-2 px-4 border-b">End Date</th>
                <th className="py-2 px-4 border-b">Status</th>
                <th className="py-2 px-4 border-b">Car Name</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking) => (
                  <tr key={booking.id} className="text-center">
                    <td className="py-2 px-4 border-b">{booking.id}</td>
                    <td className="py-2 px-4 border-b">{booking.startDate}</td>
                    <td className="py-2 px-4 border-b">{booking.endDate}</td>
                    <td className="py-2 px-4 border-b">
                      <span className={getStatusStyle(booking.status)}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-2 px-4 border-b">
                      {booking.car.model.name +
                        " " +
                        booking.car.model.mark.name}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => handleViewDetails(booking)}
                        disabled={booking.status === "CANCELLED"}
                        className={`${
                          booking.status === "Cancelled"
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-500 hover:bg-green-700"
                        } text-white px-3 py-1 rounded-lg`}
                      >
                        Voir Details
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="py-4 text-center text-gray-500 font-medium"
                  >
                    No reservations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal for Viewing Details */}
      {showModal && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full sm:w-96 transition-all transform duration-300 ease-in-out">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6">
              Reservation Details
            </h2>
            <div className="space-y-4">
              <div>
                <strong className="text-gray-700">Reservation Number : </strong>{" "}
                {selectedBooking.id}
              </div>
              <div>
                <strong className="text-gray-700">Start Date : </strong>{" "}
                {selectedBooking.startDate}
              </div>
              <div>
                <strong className="text-gray-700">End Date : </strong>{" "}
                {selectedBooking.endDate}
              </div>
              <div>
                <strong className="text-gray-700">Status : </strong>
                <span className={getStatusStyle(selectedBooking.status)}>
                  {selectedBooking.status}
                </span>
              </div>
              <div>
                <strong className="text-gray-700">Car : </strong>{" "}
                {selectedBooking.car.model.name}{" "}
                {selectedBooking.car.model.mark.name}
              </div>
              <div>
                <strong className="text-gray-700">Facture : </strong>
                {invoice ? invoice.totalAmount : "No invoice available."} MAD
              </div>
            </div>

            <div className="mt-6 space-x-4 flex justify-end">
              {selectedBooking.status !== "COMPLETED" ? (
                <>
                  <button
                    onClick={() => handleCancelBooking(selectedBooking.id)}
                    className="bg-red-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-red-700 transition duration-300 ease-in-out"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handlePayBooking(selectedBooking.id)}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition duration-300 ease-in-out"
                  >
                    Pay
                  </button>
                </>
              ) : (
                <DownloadContractButton reservationId={selectedBooking.id} user={userData} />
              )}
            </div>

            <button
              onClick={() => setShowModal(false)}
              className="mt-4 w-full bg-gray-300 text-black py-2 rounded-lg hover:bg-gray-400 transition duration-300 ease-in-out"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBooking;
