package com.example.ProjectJEE.service;

import com.example.ProjectJEE.model.Rapport;
import com.example.ProjectJEE.repository.RapportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RapportService {

    @Autowired
    private RapportRepository rapportRepository;

    public List<Rapport> getAllRapports() {
        return rapportRepository.findAll();
    }

    public Rapport getRapportById(Long id) {
        return rapportRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rapport not found with id: " + id));
    }


    public Rapport addRapport(Rapport rapport) {
        return rapportRepository.save(rapport);
    }


    // Method to update a rapport
    public Rapport updateRapport(Long id, Rapport updatedRapport) {
        Optional<Rapport> existingRapportOptional = rapportRepository.findById(id);
        if (existingRapportOptional.isPresent()) {
            Rapport existingRapport = existingRapportOptional.get();
            // Update fields of the existing rapport
            existingRapport.setStartDate(updatedRapport.getStartDate());
            existingRapport.setEndDate(updatedRapport.getEndDate());
            existingRapport.setTotalCarsRented(updatedRapport.getTotalCarsRented());
            existingRapport.setTotalEarnings(updatedRapport.getTotalEarnings());
            // Save the updated rapport to the repository
            return rapportRepository.save(existingRapport);
        } else {
            // If the rapport doesn't exist, throw an exception or return null (customize this as needed)
            throw new RuntimeException("Rapport not found with id " + id);
        }
    }

    public void deleteRapport(Long id) {
        rapportRepository.deleteById(id);
    }
}
