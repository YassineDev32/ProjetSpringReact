package com.example.ProjectJEE.controller;

import com.example.ProjectJEE.dto.TaskRequest;
import com.example.ProjectJEE.model.*;
import com.example.ProjectJEE.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @PostMapping
    public Task createTask(@RequestBody TaskRequest request) {
        return taskService.createTask(
                request.getTitle(),
                request.getDescription(),
                request.getPriority(),
                TaskStatus.PENDING, // Default status
                request.getType(),
                request.getDate(),
                request.getTime(),
                request.getCar(),
                request.getTechnician()
        );
    }

    @GetMapping("/technician/{technicianId}")
    public List<Task> getTasksByTechnician(@PathVariable Long technicianId) {
        return taskService.getTasksByTechnician(technicianId);
    }

    @GetMapping("/car/{carId}")
    public List<Task> getTasksByCar(@PathVariable Long carId) {
        return taskService.getTasksByCar(carId);
    }

    @PutMapping("/{taskId}/status")
    public Task updateTaskStatus(@PathVariable Long taskId, @RequestParam TaskStatus status) {
        return taskService.updateTaskStatus(taskId, status);
    }

    @PutMapping("/{taskId}/reassign")
    public Task reassignTask(@PathVariable Long taskId, @RequestParam Long technicianId) {
        return taskService.reassignTask(taskId, technicianId);
    }
}