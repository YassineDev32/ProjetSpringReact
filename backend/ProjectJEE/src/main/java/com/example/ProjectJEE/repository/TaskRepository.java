package com.example.ProjectJEE.repository;

import com.example.ProjectJEE.model.Task;
import com.example.ProjectJEE.model.TaskStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByTechnicianId(Long technicianId);
    List<Task> findByCarId(Long carId);
    List<Task> findByStatus(TaskStatus status);
    List<Task> findByDate(LocalDate date);
    List<Task> findByTechnicianIdAndStatus(Long technicianId, TaskStatus status);
}