package com.example.ProjectJEE.controller;

import com.example.ProjectJEE.model.Model;
import com.example.ProjectJEE.service.ModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
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
    @PutMapping("/{id}")
    public Model updateModel(@PathVariable Long id, @RequestBody Model updatedModel) {
        Model model = modelService.getModelById(id)
                .orElseThrow(() -> new RuntimeException("Model not found with id " + id));

        model.setName(updatedModel.getName());
        model.setMark(updatedModel.getMark());

        return modelService.updateModel(model);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteModel(@PathVariable Long id) {
        Model model = modelService.getModelById(id)
                .orElseThrow(() -> new RuntimeException("Model not found with id " + id));

        modelService.deleteModel(id);

        return ResponseEntity.ok("Model with id " + id + " has been deleted");
    }
}
