package com.example.ProjectJEE.service;

import com.example.ProjectJEE.model.Mark;
import com.example.ProjectJEE.repository.MarkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MarkService {

    @Autowired
    private MarkRepository markRepository;

    public List<Mark> getAllMarks() {
        return markRepository.findAll();
    }

    public Mark addMark(Mark mark) {
        return markRepository.save(mark);
    }

    public Optional<Mark> getMarkById(Long id) {
        return markRepository.findById(id);
    }
    public MarkService(MarkRepository markRepository) {
        this.markRepository = markRepository;
    }

    public Mark updateMark(Long id, Mark updatedMark) {
        // Find the existing Mark
        Mark existingMark = markRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Mark not found"));
        // Update the name if it's not null
        if (updatedMark.getName() != null) {
            existingMark.setName(updatedMark.getName());
        }
        // Update models if provided
        if (updatedMark.getModels() != null && !updatedMark.getModels().isEmpty()) {
            existingMark.setModels(updatedMark.getModels());
        }
        // Save and return the updated Mark
        return markRepository.save(existingMark);
    }
}
