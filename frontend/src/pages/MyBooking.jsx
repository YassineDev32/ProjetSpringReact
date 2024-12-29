import React, { useEffect, useState } from "react";
import api from "../api"; // Assurez-vous que votre instance Axios est correctement configurée.

const MyBooking = () => {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userData, setUserData] = useState(null);

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
          const response = await api.get(`/api/reservations/mesreservations/${userData.id}`);
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

  const handleDelete = (reservationId) => {
    console.log(`Delete booking with reservation ID: ${reservationId}`);
    // Add delete logic here.
  };

  const handleUpdate = (reservationId) => {
    console.log(`Update booking with reservation ID: ${reservationId}`);
    // Add update logic here.
  };

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen dark:text-black bg-gray-100 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-lg">
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
                    <td className="py-2 px-4 border-b">{booking.status}</td>
                    <td className="py-2 px-4 border-b">
                      {booking.car.model.name + " " + booking.car.model.mark.name}
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => handleDelete(booking.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-lg mr-2 hover:bg-red-700"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleUpdate(booking.id)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                      >
                        Update
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
    </div>
  );
};

export default MyBooking;
