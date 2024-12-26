package com.example.ProjectJEE.service;

import com.example.ProjectJEE.dto.RapportDTO;
import com.example.ProjectJEE.model.EnumReservationStatus;
import com.example.ProjectJEE.model.Rapport;
import com.example.ProjectJEE.model.Reservation;
import com.example.ProjectJEE.repository.RapportRepository;
import com.example.ProjectJEE.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class RapportService {

    @Autowired
    private RapportRepository rapportRepository;
    @Autowired
    private ReservationRepository reservationRepository;
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

    public Rapport generateRapport(LocalDate startDate, LocalDate endDate) {
        if (startDate == null || endDate == null) {
            throw new IllegalArgumentException("Les dates de début et de fin sont obligatoires.");
        }

        // Récupérer toutes les réservations complétées dans la période
        List<Reservation> completedReservations = reservationRepository.findByStatusAndPeriod(
                EnumReservationStatus.COMPLETED, startDate, endDate
        );

        // Calculer les variables du rapport
        int totalCarsRented = completedReservations.size();
        double totalEarnings = completedReservations.stream()
                .filter(reservation -> reservation.getInvoice() != null) // Vérifier si une facture existe
                .mapToDouble(reservation -> reservation.getInvoice().getTotalAmount())
                .sum();

        // Créer le rapport
        Rapport rapport = new Rapport();
        rapport.setStartDate(startDate);
        rapport.setEndDate(endDate);
        rapport.setTotalCarsRented(totalCarsRented);
        rapport.setTotalEarnings(totalEarnings);

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
