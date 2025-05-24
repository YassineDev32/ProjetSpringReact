package com.example.ProjectJEE.controller;

import com.example.ProjectJEE.dto.TaskRequest;
import com.example.ProjectJEE.model.*;
import com.example.ProjectJEE.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;

    @GetMapping
    public List<Task> getAllTasks() {
        return taskService.getAllTasks();
    }

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

    @GetMapping("/technician/{technicianUsername}")
    public List<Task> getTasksByTechnician(@PathVariable String technicianUsername) {
        return taskService.getTasksByTechnician(technicianUsername);
    }

    @GetMapping("/car/{carId}")
    public List<Task> getTasksByCar(@PathVariable Long carId) {
        return taskService.getTasksByCar(carId);
    }

    @PutMapping("/{taskId}/status")
    public Task updateTaskStatus(@PathVariable Long taskId, @RequestParam TaskStatus status) {
        return taskService.updateTaskStatus(taskId, status);
    }

    @PutMapping("/updateTask")
    public Task reassignTask(@RequestBody Task task) {
        return taskService.updateTask(task);
    }

    @DeleteMapping("/{taskId}")
    public void deleteTask(@PathVariable Long taskId) {
         taskService.deleteTask(taskId);
    }
}