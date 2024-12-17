package com.example.ProjectJEE.service;

import com.example.ProjectJEE.model.Car;
import com.example.ProjectJEE.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CarService {

    @Autowired
    private CarRepository carRepository;

    public List<Car> getAllCars() {
        return carRepository.findAll();
    }

    public Optional<Car> getCarById(Long id) {
        return carRepository.findById(id);
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
