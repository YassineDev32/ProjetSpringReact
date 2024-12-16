package com.example.ProjectJEE.controller;

import com.example.ProjectJEE.model.Rapport;
import com.example.ProjectJEE.service.RapportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rapports")
public class RapportController {

    @Autowired
    private RapportService rapportService;


    // Ajouter un rapport
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
    public ResponseEntity<Rapport> updateRapport(@PathVariable Long id, @RequestBody Rapport rapport) {
        try {
            Rapport updatedRapport = rapportService.updateRapport(id, rapport);
            return ResponseEntity.ok(updatedRapport); // Return the updated rapport with HTTP 200
        } catch (RuntimeException e) {
            // If the rapport is not found, return HTTP 404 Not Found
            return ResponseEntity.notFound().build();
        }
    }

}
