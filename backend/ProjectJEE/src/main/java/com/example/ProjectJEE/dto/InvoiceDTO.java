package com.example.ProjectJEE.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class InvoiceDTO {

    private String status;
    private double totalAmount;
    private Long reservationId;
}
