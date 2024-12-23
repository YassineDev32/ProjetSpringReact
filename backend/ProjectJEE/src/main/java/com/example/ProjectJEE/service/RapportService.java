package com.example.ProjectJEE.service;

import com.example.ProjectJEE.dto.RapportDTO;
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
    public Rapport updateRapport(Long id, RapportDTO rapportDTO) {
        Rapport existingRapport = rapportRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Rapport not found with id " + id));

        // Mettre à jour les champs si fournis dans le DTO
        if (rapportDTO.getStartDate() != null) {
            existingRapport.setStartDate(rapportDTO.getStartDate());
        }

        if (rapportDTO.getEndDate() != null) {
            existingRapport.setEndDate(rapportDTO.getEndDate());
        }

        if (rapportDTO.getTotalCarsRented() != null) {
            existingRapport.setTotalCarsRented(rapportDTO.getTotalCarsRented());
        }

        if (rapportDTO.getTotalEarnings() != null) {
            existingRapport.setTotalEarnings(rapportDTO.getTotalEarnings());
        }

        return rapportRepository.save(existingRapport);
    }

    public void deleteRapport(Long id) {
        rapportRepository.deleteById(id);
    }
}
