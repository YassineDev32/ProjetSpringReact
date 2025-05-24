import React from "react";
import axios from "axios";
import { generateContract } from "./generateContract";
import api from "../../api";

const DownloadContractButton = ({ reservationId, user }) => {
  const handleDownload = async () => {
    try {
      // Requête API pour récupérer les informations de réservation
      const response = await api.get(`/api/reservations/${reservationId}`);
      const reservation = response.data;

      // Fetch payment details
      const paymentResponse = await api.get(`/api/payments/reservation/${reservationId}`);
      const payment = paymentResponse.data;

      // Générer le contrat
      generateContract(reservation, user, payment);
    } catch (error) {
      console.error("Erreur lors de la récupération des données de réservation :", error);
    }
  };

  // Inline styles for the button
  const buttonStyle = {
    backgroundColor: "#007BFF",
    color: "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
    transition: "background-color 0.3s ease",
  };

  const buttonHoverStyle = {
    backgroundColor: "#0056b3",
  };

  // Handle hover effect using state
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <button
      onClick={handleDownload}
      style={{
        ...buttonStyle,
        ...(isHovered ? buttonHoverStyle : {}),
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      Télécharger Contrat
    </button>
  );
};

export default DownloadContractButton;
