package com.example.ProjectJEE.service;

import com.example.ProjectJEE.model.PieceStock;
import com.example.ProjectJEE.repository.PieceStockRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PieceStockService {
    private final PieceStockRepository repository;

    public PieceStockService(PieceStockRepository repository) {
        this.repository = repository;
    }

    public PieceStock ajouterPiece(PieceStock piece) {
        return repository.save(piece);
    }

    public List<PieceStock> piecesEnRupture() {
        return repository.findByQuantiteStockLessThan(5); // Seuil personnalisable
    }

    public PieceStock mettreAJourStock(Long id, int quantiteAjoutee) {
        PieceStock piece = repository.findById(id).orElseThrow();
        piece.setQuantiteStock(piece.getQuantiteStock() + quantiteAjoutee);
        return repository.save(piece);
    }
}