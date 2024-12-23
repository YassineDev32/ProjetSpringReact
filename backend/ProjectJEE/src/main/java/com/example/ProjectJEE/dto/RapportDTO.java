package com.example.ProjectJEE.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class RapportDTO {
    private LocalDate startDate;
    private LocalDate endDate;
    private Integer totalCarsRented; // Utilisation de Integer pour permettre null
    private Double totalEarnings;   // Utilisation de Double pour permettre null
}
