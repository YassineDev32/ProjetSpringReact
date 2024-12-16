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
    public Car updateCar(Long id, Car car) {
        if (carRepository.existsById(id)) {
            car.setId(id);  // Ensure the ID is preserved
            return carRepository.save(car);
        }
        throw new RuntimeException("Car not found with id " + id); // Or handle with custom exception
    }

    public void deleteCar(Long id) {
        carRepository.deleteById(id);
    }
}
