package com.example.ProjectJEE.service;

import com.example.ProjectJEE.model.Reservation;
import com.example.ProjectJEE.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Optional<Reservation> getReservationById(Long id) {
        return reservationRepository.findById(id);
    }

    public Reservation addReservation(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    // Method to update a reservation
    public Reservation updateReservation(Long id, Reservation updatedReservation) {
        Optional<Reservation> existingReservationOptional = reservationRepository.findById(id);

        if (existingReservationOptional.isPresent()) {
            Reservation existingReservation = existingReservationOptional.get();
            // Update fields of the existing reservation
            existingReservation.setStartDate(updatedReservation.getStartDate());
            existingReservation.setEndDate(updatedReservation.getEndDate());
            existingReservation.setStatus(updatedReservation.getStatus());
            existingReservation.setUser(updatedReservation.getUser());
            existingReservation.setCar(updatedReservation.getCar());
            // Save the updated reservation to the repository
            return reservationRepository.save(existingReservation);
        } else {
            // If the reservation doesn't exist, throw an exception or return null (customize this as needed)
            throw new RuntimeException("Reservation not found with id " + id);
        }
    }

    public void deleteReservation(Long id) {
        reservationRepository.deleteById(id);
    }
}
