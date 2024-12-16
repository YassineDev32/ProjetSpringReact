package com.example.ProjectJEE.controller;

import com.example.ProjectJEE.model.Mark;
import com.example.ProjectJEE.service.MarkService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/marks")
public class MarkController {

    @Autowired
    private MarkService markService;

    // Obtenir toutes les marques
    @GetMapping
    public ResponseEntity<List<Mark>> getAllMarks() {
        List<Mark> marks = markService.getAllMarks();
        return ResponseEntity.ok(marks);
    }

    // Ajouter une nouvelle marque
    @PostMapping("/add")
    public ResponseEntity<Mark> addMark(@RequestBody Mark mark) {
        Mark savedMark = markService.addMark(mark);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedMark);
    }

    // Obtenir une marque par ID
    @GetMapping("/{id}")
    public ResponseEntity<Mark> getMarkById(@PathVariable Long id) {
        return markService.getMarkById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }
}
