package com.example.ProjectJEE.controller;

import com.example.ProjectJEE.model.Model;
import com.example.ProjectJEE.service.ModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/models")
public class ModelController {

    @Autowired
    private ModelService modelService;

    // Get all models
    @GetMapping("/")
    public List<Model> getAllModels() {
        return modelService.getAllModels();
    }

    // Create a new model
    @PostMapping("add")
    public Model addModel(@RequestBody Model model) {
        return modelService.addModel(model);
    }

    // Get a model by ID
    @GetMapping("/{id}")
    public Model getModelById(@PathVariable Long id) {
        return modelService.getModelById(id)
                .orElseThrow(() -> new RuntimeException("Invoice not found with id " + id));
    }
}
