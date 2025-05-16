package com.example.ProjectJEE.dto;

import com.example.ProjectJEE.model.Car;
import com.example.ProjectJEE.model.TaskPriority;
import com.example.ProjectJEE.model.TaskType;
import com.example.ProjectJEE.model.User;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class TaskRequest {
    private String title;
    private String description;
    private TaskPriority priority;
    private TaskType type;
    private LocalDate date;
    private LocalTime time;
    private Car car;
    private User technician;
}