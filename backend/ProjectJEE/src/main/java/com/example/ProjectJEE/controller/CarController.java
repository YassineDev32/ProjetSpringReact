package com.example.ProjectJEE.controller;

import com.example.ProjectJEE.dto.CarDTO;
import com.example.ProjectJEE.model.Car;
import com.example.ProjectJEE.model.Model;
import com.example.ProjectJEE.model.EnumFuelType;
import com.example.ProjectJEE.model.EnumStatus;
import com.example.ProjectJEE.repository.ModelRepository;
import com.example.ProjectJEE.service.CarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/cars")
public class CarController {

    @Autowired
    private CarService carService;
    @Autowired
    private ModelRepository modelRepository;

    @GetMapping("/")
    public List<Car> getAllCars() {
        return carService.getAllCars();
    }

    @GetMapping("/available")
    public ResponseEntity<List<Car>> getAvailableCars(
            @RequestParam(required = false) LocalDate startDate,
            @RequestParam(required = false) LocalDate endDate) {

        // Si aucune date n'est fournie, utiliser la période par défaut
        List<Car> availableCars = carService.getAvailableCars(startDate, endDate);
        return ResponseEntity.ok(availableCars);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Car> getCarById(@PathVariable Long id) {
        return carService.getCarById(id)
                .map(ResponseEntity::ok) // If the car is found, return a 200 OK response with the car
                .orElseGet(() -> ResponseEntity.notFound().build()); // If not found, return a 404 Not Found
    }

    @PostMapping("/add")
    public ResponseEntity<Car> addCar(@RequestBody CarDTO carDTO) {
        try {
            // Create the Car object
            Car car = new Car();
            car.setMatricule(carDTO.getMatricule());
            car.setDescription(carDTO.getDescription());
            car.setPrice((int) carDTO.getPrice());
            car.setStatus(EnumStatus.valueOf(carDTO.getStatus().toUpperCase()));
            car.setSeats(carDTO.getSeats());
            car.setManual(carDTO.isManual());
            car.setAirConditioning(carDTO.isAirConditioning());
            car.setFuelType(EnumFuelType.valueOf(carDTO.getFuelType().toUpperCase()));

            // Assuming the image is Base64 encoded in the DTO
            if (carDTO.getImage() != null) {
                byte[] decodedImage = java.util.Base64.getDecoder().decode(carDTO.getImage());
                car.setImage(decodedImage);
            }

            // Fetch the Model entity by its ID
            if (carDTO.getModelId() != null) {
                Optional<Model> model = modelRepository.findById(carDTO.getModelId());
                if (model.isPresent()) {
                    car.setModel(model.get()); // Set the model on the car
                } else {
                    return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // Model not found
                }
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); // Model ID missing
            }

            // Save the car entity
            Car createdCar = carService.addCar(car);
            return ResponseEntity.ok(createdCar);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }



    @PutMapping("/{id}")
    public ResponseEntity<Car> updateCar(@PathVariable Long id, @RequestBody Car car) {
        Optional<Car> existingCar = carService.getCarById(id);
        if (existingCar.isPresent()) {
            Car updatedCar = carService.updateCar(existingCar.get(), car);
            return ResponseEntity.ok(updatedCar);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @GetMapping("/count")
    public ResponseEntity<Long> getTotalCarsCount() {
        Long totalCars = carService.getTotalCarsCount();
        return ResponseEntity.ok(totalCars);
    }

    @DeleteMapping("/{id}")
    public void deleteCar(@PathVariable Long id) {
        carService.deleteCar(id);
    }
}
