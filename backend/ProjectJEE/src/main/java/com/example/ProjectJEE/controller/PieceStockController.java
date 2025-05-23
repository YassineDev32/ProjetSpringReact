package com.example.ProjectJEE.controller;

import com.example.ProjectJEE.model.PieceStock;
import com.example.ProjectJEE.service.PieceStockService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stocks")
public class PieceStockController {
    private final PieceStockService service;

    public PieceStockController(PieceStockService service) {
        this.service = service;
    }

    @GetMapping("/alertes")
    public List<PieceStock> getPiecesEnRupture() {
        return service.piecesEnRupture();
    }

    @PostMapping
    public PieceStock ajouterPiece(@RequestBody PieceStock piece) {
        return service.ajouterPiece(piece);
    }

    @PatchMapping("/{id}/approvisionner")
    public PieceStock approvisionner(
            @PathVariable Long id,
            @RequestParam int quantite) {
        return service.mettreAJourStock(id, quantite);
    }
}