package com.example.ProjectJEE.service;

import com.example.ProjectJEE.dto.ModelDTO;
import com.example.ProjectJEE.model.Mark;
import com.example.ProjectJEE.model.Model;
import com.example.ProjectJEE.repository.MarkRepository;
import com.example.ProjectJEE.repository.ModelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ModelService {

    @Autowired
    private ModelRepository modelRepository;

    @Autowired
    private MarkRepository markRepository;

    public List<Model> getAllModels() {
        return modelRepository.findAll();
    }

    public Optional<Model> getModelById(Long id) {
        return modelRepository.findById(id);
    }

    public Model addModel(Model model) {
        return modelRepository.save(model);
    }
    public Model updateModel(Long id, ModelDTO modelDTO) {
        // Find the existing Model
        Model existingModel = modelRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Model not found"));
        // Update the name if it's not null
        if (modelDTO.getName() != null) {
            existingModel.setName(modelDTO.getName());
        }
        // Update the Mark if markId is provided
        if (modelDTO.getMarkId() != null) {
            Mark mark = markRepository.findById(modelDTO.getMarkId())
                    .orElseThrow(() -> new RuntimeException("Mark not found"));
            existingModel.setMark(mark);
        }

        // Save and return the updated Model
        return modelRepository.save(existingModel);
    }

    public void deleteModel(Long id) {
        modelRepository.deleteById(id);
    }
}
