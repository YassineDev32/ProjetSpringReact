package com.example.ProjectJEE.service;

import com.example.ProjectJEE.model.Model;
import com.example.ProjectJEE.repository.ModelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ModelService {

    @Autowired
    private ModelRepository modelRepository;

    public List<Model> getAllModels() {
        return modelRepository.findAll();
    }

    public Optional<Model> getModelById(Long id) {
        return modelRepository.findById(id);
    }

    public Model addModel(Model model) {
        return modelRepository.save(model);
    }
    public Model updateModel(Model model) {
        return modelRepository.save(model);  // Sauvegarde le modèle mis à jour
    }

    public void deleteModel(Long id) {
        modelRepository.deleteById(id);
    }
}
