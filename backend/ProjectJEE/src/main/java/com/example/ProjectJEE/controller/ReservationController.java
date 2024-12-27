package com.example.ProjectJEE.controller;

import com.example.ProjectJEE.dto.ReservationDTO;
import com.example.ProjectJEE.model.Reservation;
import com.example.ProjectJEE.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/reservations")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @GetMapping
    public List<Reservation> getAllReservations() {
        return reservationService.getAllReservations();
    }

    @GetMapping("/{id}")
    public Reservation getReservationById(@PathVariable Long id) {
        return reservationService.getReservationById(id)
                .orElseThrow(() -> new RuntimeException("Reservation not found with id " + id));
    }
    @PutMapping("/{id}/confirm")
    public ResponseEntity<Void> confirmReservation(@PathVariable Long id) {
        reservationService.confirmReservation(id);
        return ResponseEntity.ok().build();
    }

    @PutMapping("/{id}/cancel")
    public ResponseEntity<Void> cancelReservation(@PathVariable Long id) {
        reservationService.cancelReservation(id);
        return ResponseEntity.ok().build();
    }
    @PostMapping("/create")
    public ResponseEntity<Reservation> createReservation(@RequestBody ReservationDTO request) {
        Reservation reservation = reservationService.createReservation(
                request.getCarId(), request.getUserId(),
                request.getStartDate(), request.getEndDate(),
                request.getPhone(), request.getAddress()
        );
        return ResponseEntity.ok(reservation);
    }

    @PostMapping("/add")
    public ResponseEntity<Reservation> addReservation(@RequestBody ReservationDTO reservationDTO) {
        try {
            Reservation newReservation = reservationService.addReservation(reservationDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(newReservation);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<Reservation> updateReservation(@PathVariable Long id, @RequestBody ReservationDTO reservationDTO) {
        try {
            Reservation updatedReservation = reservationService.updateReservation(id, reservationDTO);
            return ResponseEntity.ok(updatedReservation);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public void deleteReservation(@PathVariable Long id) {
        reservationService.deleteReservation(id);
    }
}
