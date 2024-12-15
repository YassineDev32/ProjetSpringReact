package com.example.ProjectJEE.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Rapport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate startDate; // Début de la période
    private LocalDate endDate;   // Fin de la période
    private int totalCarsRented;     // Nombre de voitures louées
    private double totalEarnings;    // Bénéfices totaux

}
