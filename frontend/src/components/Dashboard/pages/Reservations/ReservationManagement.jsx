import React, { useState, useEffect } from "react";
import ReservationTable from "./ReservationTable"; // Un composant pour afficher les réservations
import ReservationFilter from "./ReservationFilter"; // Un composant pour filtrer les réservations
import api from "../../../../api";

const ReservationManagement = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({ status: "", carModel: "" });

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await api.get("/api/reservations");
        setReservations(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reservations:", error);
        setLoading(false);
      }
    };

    fetchReservations();
  }, []);

  const handleFilterChange = (filterKey, value) => {
    setFilters({ ...filters, [filterKey]: value });
  };

  const filteredReservations = reservations
    .filter(reservation =>
      (!filters.status || reservation.status.toLowerCase().includes(filters.status.toLowerCase()))
    )
    .sort((a, b) => {
      if (filters.dateOrder === 'newest') {
        return new Date(b.startDate) - new Date(a.startDate);
      }
      if (filters.dateOrder === 'oldest') {
        return new Date(a.startDate) - new Date(b.startDate);
      }
      return 0; // Pas de tri si aucun ordre sélectionné
    });

  const handleCancel = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await api.put(`/api/reservations/${id}/cancel`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Mise à jour de l'état local avec la nouvelle valeur du statut
      setReservations((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation.id === id ? { ...reservation, status: "CANCELLED" } : reservation
        )
      );
    } catch (error) {
      console.error("Error canceling reservation:", error);
    }
  };

  const handleConfirm = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await api.put(`/api/reservations/${id}/confirm`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      // Mise à jour de l'état local avec la nouvelle valeur du statut
      setReservations((prevReservations) =>
        prevReservations.map((reservation) =>
          reservation.id === id ? { ...reservation, status: "CONFIRMED" } : reservation
        )
      );
    } catch (error) {
      console.error("Error confirming reservation:", error);
    }
  };

  return (
    <div className="flex flex-col w-full max-w-full text-black my-20 mx-auto bg-white p-6 rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-700">
        Gestion des Réservations
      </h1>
      <div className="mb-6">
        <ReservationFilter
          filters={filters}
          onFilterChange={handleFilterChange}
        />
      </div>
      {loading ? (
        <div className="text-center text-gray-500">
          Chargement des réservations...
        </div>
      ) : (
        <div className="overflow-x-auto">
          <ReservationTable
            reservations={filteredReservations}
            onCancel={handleCancel}
            onConfirm={handleConfirm}
          />
        </div>
      )}
    </div>
  );
};

export default ReservationManagement;
