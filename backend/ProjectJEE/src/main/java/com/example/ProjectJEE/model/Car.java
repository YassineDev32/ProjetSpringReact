package com.example.ProjectJEE.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Car {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String matricule;
    private String description;
    private int price;
    @Enumerated(EnumType.STRING)
    private EnumStatus status;
    private int seats;
    private boolean manual;
    private boolean airConditioning;
    @Enumerated(EnumType.STRING)
    private EnumFuelType fuelType;

    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private String image;

    @ManyToOne
    @JoinColumn(name = "model_id")
    private Model model;
}
