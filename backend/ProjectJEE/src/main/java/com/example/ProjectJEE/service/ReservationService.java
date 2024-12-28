package com.example.ProjectJEE.service;

import com.example.ProjectJEE.dto.ReservationDTO;
import com.example.ProjectJEE.model.*;
import com.example.ProjectJEE.repository.CarRepository;
import com.example.ProjectJEE.repository.InvoiceRepository;
import com.example.ProjectJEE.repository.ReservationRepository;
import com.example.ProjectJEE.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import javax.xml.datatype.DatatypeConstants;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private CarRepository carRepository;

    @Autowired
    private InvoiceRepository invoiceRepository;

    public List<Reservation> getAllReservations() {
        return reservationRepository.findAll();
    }

    public Optional<Reservation> getReservationById(Long id) {
        return reservationRepository.findById(id);
    }

    public Reservation addReservation(ReservationDTO reservationDTO) {
        Reservation reservation = new Reservation();

        // Associer l'utilisateur
        User user = userRepository.findById(reservationDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found with id " + reservationDTO.getUserId()));
        reservation.setUser(user);

        // Associer la voiture
        Car car = carRepository.findById(reservationDTO.getCarId())
                .orElseThrow(() -> new RuntimeException("Car not found with id " + reservationDTO.getCarId()));
        reservation.setCar(car);

        // Définir les autres champs
        reservation.setStartDate(reservationDTO.getStartDate());
        reservation.setEndDate(reservationDTO.getEndDate());
        reservation.setStatus(EnumReservationStatus.valueOf(reservationDTO.getStatus().toUpperCase()));

        return reservationRepository.save(reservation);
    }
    // Créer une réservation
    public Reservation createReservation(Long carId, Long userId, LocalDate startDate, LocalDate endDate, String phone, String address) {
        // Vérification que la voiture existe
        Car car = carRepository.findById(carId)
                .orElseThrow(() -> new IllegalArgumentException("Car not found with ID: " + carId));

        // Vérification que l'utilisateur existe
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found with ID: " + userId));

        // Création de la réservation
        Reservation reservation = new Reservation();
        reservation.setCar(car);
        reservation.setUser(user);
        reservation.setStartDate(startDate);
        reservation.setEndDate(endDate);
        reservation.setPhone(phone);
        reservation.setAddress(address);
        reservation.setStatus(EnumReservationStatus.PENDING);

        return reservationRepository.save(reservation);
    }
    public Reservation findById(Long id) {
        return reservationRepository.findById(id).orElse(null);
    }
    public List<Reservation> getReservationsByUser(Long userId) {
        return reservationRepository.findByUserId(userId);
    }
    public void confirmReservation(Long reservationId) {
        Reservation reservation = findById(reservationId);
        if (reservation != null) {
            // Créer une nouvelle facture liée à la réservation
            Invoice invoice = new Invoice();
            invoice.setReservation(reservation);
            invoice.setTotalAmount(calculateTotalAmount(reservation)); // Calculer le montant total
            invoiceRepository.save(invoice);

            // Mettre à jour le statut de la réservation
            reservation.setStatus(EnumReservationStatus.CONFIRMED);
            reservationRepository.save(reservation);
        }
    }

    public void cancelReservation(Long reservationId) {
        Reservation reservation = findById(reservationId);
        if (reservation != null) {
            // Mettre à jour le statut de la réservation
            reservation.setStatus(EnumReservationStatus.CANCELLED);
            reservationRepository.save(reservation);
        }
    }
    public Reservation updateReservationDetails(Long id, String phone, String address) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found"));

        if (reservation.getStatus() != EnumReservationStatus.PENDING) {
            throw new IllegalStateException("Only PENDING reservations can be updated.");
        }

        if (phone != null) {
            reservation.setPhone(phone);
        }
        if (address != null) {
            reservation.setAddress(address);
        }

        return reservationRepository.save(reservation);
    }

    // Méthode pour calculer le montant total de la réservation
    private double calculateTotalAmount(Reservation reservation) {
        LocalDate startDate = reservation.getStartDate();
        LocalDate endDate = reservation.getEndDate();

        long days = endDate.toEpochDay() - startDate.toEpochDay() + 1;
        int carPricePerDay = reservation.getCar().getPrice();
        double totalAmount = days * carPricePerDay;

        // Add any potential discounts or surcharges here
        // For example:
        // - Discount for long-term rentals
        // - Surcharge for additional services

        return totalAmount;
    }

    public Reservation updateReservation(Long id, ReservationDTO reservationDTO) {
        Reservation existingReservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found with id " + id));

        // Mettre à jour les champs si fournis
        if (reservationDTO.getStartDate() != null) {
            existingReservation.setStartDate(reservationDTO.getStartDate());
        }
        if (reservationDTO.getEndDate() != null) {
            existingReservation.setEndDate(reservationDTO.getEndDate());
        }
        if (reservationDTO.getStatus() != null) {
            existingReservation.setStatus(EnumReservationStatus.valueOf(reservationDTO.getStatus().toUpperCase()));
        }
        if (reservationDTO.getUserId() != null) {
            User user = userRepository.findById(reservationDTO.getUserId())
                    .orElseThrow(() -> new RuntimeException("User not found with id " + reservationDTO.getUserId()));
            existingReservation.setUser(user);
        }
        if (reservationDTO.getCarId() != null) {
            Car car = carRepository.findById(reservationDTO.getCarId())
                    .orElseThrow(() -> new RuntimeException("Car not found with id " + reservationDTO.getCarId()));
            existingReservation.setCar(car);
        }

        return reservationRepository.save(existingReservation);
    }

    public void deleteReservation(Long id) {
        reservationRepository.deleteById(id);
    }
}
