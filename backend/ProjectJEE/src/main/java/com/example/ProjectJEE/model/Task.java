package com.example.ProjectJEE.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Getter
@Setter
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;

    @Enumerated(EnumType.STRING)
    private TaskPriority priority; // HIGH, MEDIUM, LOW

    @Enumerated(EnumType.STRING)
    private TaskStatus status; // PENDING, IN_PROGRESS, COMPLETED, CANCELLED

    @Enumerated(EnumType.STRING)
    private TaskType type; // MAINTENANCE, REPAIR, INSPECTION, etc.

    private LocalDate date;
    private LocalTime time;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "car_id")
    private Car car;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "technician_id")
    private User technician;





}



