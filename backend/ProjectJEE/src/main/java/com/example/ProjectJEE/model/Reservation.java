package com.example.ProjectJEE.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Reservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "car_id", nullable = false)
    private Car car;

    private LocalDate startDate;
    private LocalDate endDate;

    private String phone; // Nouveau champ pour le téléphone
    private String address;

    @Enumerated(EnumType.STRING)
    private EnumReservationStatus status = EnumReservationStatus.PENDING;

    @OneToOne(mappedBy = "reservation", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JsonIgnore
    private Invoice invoice;
}

