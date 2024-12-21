package com.example.ProjectJEE.controller;

import com.example.ProjectJEE.dto.ModelDTO;
import com.example.ProjectJEE.model.Mark;
import com.example.ProjectJEE.model.Model;
import com.example.ProjectJEE.repository.MarkRepository;
import com.example.ProjectJEE.service.MarkService;
import com.example.ProjectJEE.service.ModelService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/models")
public class ModelController {

    @Autowired
    private ModelService modelService;

    @Autowired
    private MarkRepository markRepository;

    // Get all models
    @GetMapping("/")
    public List<Model> getAllModels() {
        return modelService.getAllModels();
    }

    // Create a new model
    @PostMapping("/add")
    public Model addModel(@RequestBody ModelDTO modelDTO) {
        // Fetch the Mark entity using markId
        Mark mark = markRepository.findById(modelDTO.getMarkId())
                .orElseThrow(() -> new EntityNotFoundException("Mark not found"));
        // Create a new Model entity and map the fields from the DTO
        Model model = new Model();
        model.setName(modelDTO.getName());
        model.setMark(mark);  // Set the fetched Mark
        // Add the model to the database
        return modelService.addModel(model);
    }
    // Get a model by ID
    @GetMapping("/{id}")
    public Model getModelById(@PathVariable Long id) {
        return modelService.getModelById(id)
                .orElseThrow(() -> new RuntimeException("Invoice not found with id " + id));
    }
    @PutMapping("/{id}")
    public ResponseEntity<Model> updateModel(@PathVariable Long id, @RequestBody ModelDTO modelDTO) {
        try {
            Model updatedModel = modelService.updateModel(id, modelDTO);
            return ResponseEntity.ok(updatedModel);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build(); // Return 404 if the Model or Mark is not found
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteModel(@PathVariable Long id) {
        Model model = modelService.getModelById(id)
                .orElseThrow(() -> new RuntimeException("Model not found with id " + id));

        modelService.deleteModel(id);

        return ResponseEntity.ok("Model with id " + id + " has been deleted");
    }
}
