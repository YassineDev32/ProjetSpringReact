package com.example.ProjectJEE.model;

public enum EnumReservationStatus {
    PENDING,   // En attente de confirmation
    CONFIRMED, // Confirmée par l'admin
    CANCELLED, // Annulée
    COMPLETED  // Finalisée après paiement et génération du contrat
}
