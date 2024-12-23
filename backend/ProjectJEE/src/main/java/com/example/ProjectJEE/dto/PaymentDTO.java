package com.example.ProjectJEE.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class PaymentDTO {
    private String method; // Représente EnumPaymentMethod
    private Double amount; // Utilise Double pour permettre des valeurs null
    private LocalDateTime paymentDate;
    private Long invoiceId; // ID de la facture associée
}