package com.example.ProjectJEE.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Invoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double totalAmount;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "reservation_id", nullable = false)
    private Reservation reservation;

    @Enumerated(EnumType.STRING)
    private EnumInvoiceStatus status = EnumInvoiceStatus.PENDING;

    @OneToOne(mappedBy = "invoice", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JsonIgnore
    private Payment payment;

    @OneToOne(mappedBy = "invoice", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    @JsonIgnore
    private Contract contract;
}
