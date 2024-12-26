import React from 'react';

const MyBooking = () => {
  const bookings = [
    {
      reservationNumber: '12345',
      startDate: '2024-01-01',
      endDate: '2024-01-10',
      status: 'Confirmed',
      carName: 'Toyota Corolla',
    },
    {
      reservationNumber: '67890',
      startDate: '2024-02-15',
      endDate: '2024-02-20',
      status: 'Pending',
      carName: 'Honda Civic',
    },
    // Add more bookings as needed
  ];

  const handleDelete = (reservationNumber) => {
    // Add your delete logic here
    console.log(`Delete booking with reservation number: ${reservationNumber}`);
  };

  const handleUpdate = (reservationNumber) => {
    // Add your update logic here
    console.log(`Update booking with reservation number: ${reservationNumber}`);
  };

  return (
    <div className="min-h-screen dark:text-black bg-gray-100 p-4 sm:p-6">
      <div className="max-w-6xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 text-center">My Booking</h1>
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
              {bookings.map((booking, index) => (
                <tr key={index} className="text-center">
                  <td className="py-2 px-4 border-b">{booking.reservationNumber}</td>
                  <td className="py-2 px-4 border-b">{booking.startDate}</td>
                  <td className="py-2 px-4 border-b">{booking.endDate}</td>
                  <td className="py-2 px-4 border-b">{booking.status}</td>
                  <td className="py-2 px-4 border-b">{booking.carName}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleDelete(booking.reservationNumber)}
                      className="bg-red-500 text-white px-3 py-1 rounded-lg mr-2 hover:bg-red-700"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleUpdate(booking.reservationNumber)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-700"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyBooking;
