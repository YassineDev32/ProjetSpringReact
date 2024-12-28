package com.example.ProjectJEE.repository;

import com.example.ProjectJEE.model.Car;
import com.example.ProjectJEE.model.EnumReservationStatus;
import com.example.ProjectJEE.model.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByCarAndStatusIn(Car car, List<EnumReservationStatus> statuses);
    @Query("SELECT r FROM Reservation r " +
            "LEFT JOIN FETCH r.invoice i " +
            "WHERE r.status = :status AND r.startDate >= :startDate AND r.endDate <= :endDate")
    List<Reservation> findByStatusAndPeriod(
            @Param("status") EnumReservationStatus status,
            @Param("startDate") LocalDate startDate,
            @Param("endDate") LocalDate endDate
    );
    List<Reservation> findByUserId(Long userId);
}
