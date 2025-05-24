package com.example.ProjectJEE.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.*;

@Entity
@Getter
@Setter
public class PieceStock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String reference;
    private String nom;
    private String categorie; // Ex: Moteur, Frein, Électricité
    private String fournisseur;
    private int quantiteStock;
    private int seuilMinimal;
    private double prixUnitaire;

    @Lob
    @Column(columnDefinition = "MEDIUMBLOB")
    private byte[] imagePiece;


    @OneToMany(mappedBy = "piece", cascade = CascadeType.ALL)
    private List<InterventionPiece> interventions = new ArrayList<>();
}