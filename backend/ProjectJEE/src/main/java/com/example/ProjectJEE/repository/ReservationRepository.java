package com.example.ProjectJEE.repository;

import com.example.ProjectJEE.model.Car;
import com.example.ProjectJEE.model.EnumReservationStatus;
import com.example.ProjectJEE.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByCarAndStatusIn(Car car, List<EnumReservationStatus> statuses);
}
