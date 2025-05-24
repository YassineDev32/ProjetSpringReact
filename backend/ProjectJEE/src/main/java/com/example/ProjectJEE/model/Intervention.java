package com.example.ProjectJEE.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Intervention {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;
    private LocalDateTime dateDebut;
    private LocalDateTime dateFin;
    private double coutTotal;
    private String observations;

    // Relation avec la tâche de maintenance
    @OneToOne
    @JoinColumn(name = "task_id")
    private Task task;

    // Relation avec le technicien
    @ManyToOne
    @JoinColumn(name = "technicien_id")
    private User technicien;

    // Relation avec les pièces utilisées
    @OneToMany(mappedBy = "intervention", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<InterventionPiece> piecesUtilisees = new ArrayList<>();

    // Méthodes utilitaires
    public void ajouterPiece(PieceStock piece, int quantite) {
        InterventionPiece interventionPiece = new InterventionPiece(this, piece, quantite);
        piecesUtilisees.add(interventionPiece);
        piece.getInterventions().add(interventionPiece);
    }

    public void calculerCoutTotal() {
        this.coutTotal = piecesUtilisees.stream()
                .mapToDouble(ip -> ip.getPiece().getPrixUnitaire() * ip.getQuantite())
                .sum();
    }
}