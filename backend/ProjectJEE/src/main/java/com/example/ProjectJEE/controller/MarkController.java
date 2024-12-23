package com.example.ProjectJEE.controller;

import com.example.ProjectJEE.model.Mark;
import com.example.ProjectJEE.service.MarkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/marks")
public class MarkController {

    @Autowired
    private MarkService markService;

    @GetMapping("/")
    public ResponseEntity<List<Map<String, Object>>> getAllMarks() {
        List<Mark> marks = markService.getAllMarks();

        // Transformation de la liste des marques pour inclure leurs modèles
        List<Map<String, Object>> response = marks.stream().map(mark -> {
            Map<String, Object> markWithModels = new HashMap<>();
            markWithModels.put("id", mark.getId());
            markWithModels.put("name", mark.getName());
            markWithModels.put("models", mark.getModels().stream().map(model -> {
                Map<String, Object> modelData = new HashMap<>();
                modelData.put("id", model.getId());
                modelData.put("name", model.getName());
                return modelData;
            }).toList());
            return markWithModels;
        }).toList();

        return ResponseEntity.ok(response);
    }


    // Ajouter une nouvelle marque
    @PostMapping("/add")
    public ResponseEntity<Mark> addMark(@RequestBody Mark mark) {
        Mark savedMark = markService.addMark(mark);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedMark);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Mark> updateMark(@PathVariable Long id, @RequestBody Mark mark) {
        try {
            Mark updatedMark = markService.updateMark(id, mark);
            return ResponseEntity.ok(updatedMark);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    // Obtenir une marque par ID
    @GetMapping("/{id}")
    public ResponseEntity<Mark> getMarkById(@PathVariable Long id) {
        return markService.getMarkById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
}
