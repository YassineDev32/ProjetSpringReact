package com.example.ProjectJEE.service;

import com.example.ProjectJEE.model.Car;
import com.example.ProjectJEE.model.EnumReservationStatus;
import com.example.ProjectJEE.model.Reservation;
import com.example.ProjectJEE.repository.CarRepository;
import com.example.ProjectJEE.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CarService {

    @Autowired
    private CarRepository carRepository;
    @Autowired
    private ReservationRepository reservationRepository;

    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    public Long getTotalCarsCount() {
        return carRepository.count();
    }

    public Optional<Car> getCarById(Long id) {
        return carRepository.findById(id);
    }
    public List<Car> getAvailableCars() {
        // 1. Définir la période par défaut (aujourd'hui à 1 an après)
        LocalDate startDate = LocalDate.now();
        LocalDate endDate = startDate.plusYears(1);

        // 2. Récupérer toutes les voitures disponibles pendant cette période
        return getAvailableCars(startDate, endDate);
    }


    public List<Car> getAvailableCars(LocalDate startDate, LocalDate endDate) {
        // Si aucune date n'est fournie, utiliser une période par défaut
        if (startDate == null || endDate == null) {
            startDate = LocalDate.now();
            endDate = startDate.plusYears(1);
        }

        // Récupérer toutes les voitures
        List<Car> allCars = carRepository.findAll();
        List<Car> availableCars = new ArrayList<>();

        for (Car car : allCars) {
            // Récupérer uniquement les réservations actives (COMPLETED ou CONFIRMED)
            List<Reservation> activeReservations = reservationRepository.findByCarAndStatusIn(
                    car,
                    List.of(EnumReservationStatus.COMPLETED, EnumReservationStatus.CONFIRMED)
            );

            boolean isAvailable = true;

            for (Reservation reservation : activeReservations) {
                // Vérifier si la réservation chevauche la période
                if (isDateOverlapping(reservation, startDate, endDate)) {
                    isAvailable = false;
                    break;
                }
            }

            if (isAvailable) {
                availableCars.add(car);
            }
        }

        return availableCars;
    }

    // Vérifier si les dates de réservation se chevauchent
    private boolean isDateOverlapping(Reservation reservation, LocalDate startDate, LocalDate endDate) {
        return startDate.isBefore(reservation.getEndDate()) && endDate.isAfter(reservation.getStartDate());
    }
    public Car addCar(Car car) {
        return carRepository.save(car);
    }
    public Car updateCar(Car existingCar, Car updatedData) {
        if (updatedData.getMatricule() != null) existingCar.setMatricule(updatedData.getMatricule());
        if (updatedData.getDescription() != null) existingCar.setDescription(updatedData.getDescription());
        if (updatedData.getPrice() != 0) existingCar.setPrice(updatedData.getPrice());
        if (updatedData.getStatus() != null) existingCar.setStatus(updatedData.getStatus());
        if (updatedData.getSeats() != 0) existingCar.setSeats(updatedData.getSeats());
        if (updatedData.isManual() != existingCar.isManual()) existingCar.setManual(updatedData.isManual());
        if (updatedData.isAirConditioning() != existingCar.isAirConditioning()) existingCar.setAirConditioning(updatedData.isAirConditioning());
        if (updatedData.getFuelType() != null) existingCar.setFuelType(updatedData.getFuelType());
        if (updatedData.getImage() != null) existingCar.setImage(updatedData.getImage());
        if (updatedData.getModel() != null) existingCar.setModel(updatedData.getModel());

        return carRepository.save(existingCar);
    }


    public void deleteCar(Long id) {
        carRepository.deleteById(id);
    }
}
