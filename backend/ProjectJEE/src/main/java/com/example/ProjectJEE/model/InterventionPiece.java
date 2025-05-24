package com.example.ProjectJEE.model;


import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
public class InterventionPiece {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "intervention_id")
    private Intervention intervention;

    @ManyToOne
    @JoinColumn(name = "piece_id")
    private PieceStock piece;

    private int quantite;

    public InterventionPiece() {}

    public InterventionPiece(Intervention intervention, PieceStock piece, int quantite) {
        this.intervention = intervention;
        this.piece = piece;
        this.quantite = quantite;
    }
}