package com.example.ProjectJEE.dto;


import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CarDTO {

    private String matricule;
    private String description;
    private double price;
    private String status;
    private int seats;
    private boolean manual;
    private boolean airConditioning;
    private String fuelType;
    private String image;
    private Long modelId;

}
