package com.example.ProjectJEE.repository;

import com.example.ProjectJEE.model.PieceStock;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface PieceStockRepository extends JpaRepository<PieceStock, Long> {
    List<PieceStock> findByQuantiteStockLessThan(int seuil);
    List<PieceStock> findByCategorie(String categorie);
}