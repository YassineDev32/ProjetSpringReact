package com.example.ProjectJEE.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class ReservationDTO {
    private Long userId;               // ID de l'utilisateur
    private Long carId;                // ID de la voiture
    private LocalDate startDate;       // Date de début
    private LocalDate endDate;         // Date de fin
    private String status;             // Statut (sous forme de chaîne)
}
