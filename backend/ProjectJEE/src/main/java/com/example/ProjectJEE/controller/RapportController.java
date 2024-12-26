package com.example.ProjectJEE.controller;

import com.example.ProjectJEE.dto.RapportDTO;
import com.example.ProjectJEE.model.Rapport;
import com.example.ProjectJEE.service.RapportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/rapports")
public class RapportController {

    @Autowired
    private RapportService rapportService;

    @PostMapping("/generate")
    public ResponseEntity<Rapport> generateRapport(@RequestBody Map<String, String> dateRange) {
        LocalDate startDate = LocalDate.parse(dateRange.get("startDate"));
        LocalDate endDate = LocalDate.parse(dateRange.get("endDate"));

        Rapport rapport = rapportService.generateRapport(startDate, endDate);
        return ResponseEntity.ok(rapport);
    }
    @PostMapping("/add")
    public ResponseEntity<Rapport> addRapport(@RequestBody Rapport rapport) {
        Rapport savedRapport = rapportService.addRapport(rapport);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedRapport);
    }

    // Obtenir tous les rapports
    @GetMapping
    public ResponseEntity<List<Rapport>> getAllRapports() {
        return ResponseEntity.ok(rapportService.getAllRapports());
    }

    // Obtenir un rapport par ID
    @GetMapping("/{id}")
    public ResponseEntity<Rapport> getRapportById(@PathVariable Long id) {
        Rapport rapport = rapportService.getRapportById(id);
        return ResponseEntity.ok(rapport);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Rapport> updateRapport(@PathVariable Long id, @RequestBody RapportDTO rapportDTO) {
        try {
            Rapport updatedRapport = rapportService.updateRapport(id, rapportDTO);
            return ResponseEntity.ok(updatedRapport); // Retourne le rapport mis à jour avec HTTP 200
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build(); // Retourne HTTP 404 si le rapport n'existe pas
        }
    }
    @DeleteMapping("/{id}")
    public void deleteRapport(@PathVariable Long id) {
        rapportService.deleteRapport(id);
    }

}
