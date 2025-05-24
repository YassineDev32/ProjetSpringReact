package com.example.ProjectJEE.service;

import com.example.ProjectJEE.model.*;
import com.example.ProjectJEE.repository.TaskRepository;
import com.example.ProjectJEE.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private final TaskRepository taskRepository;
    private final UserRepository userRepository;

    @Autowired
    public TaskService(TaskRepository taskRepository, UserRepository userRepository) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
    }

    public Task createTask(String title, String description, TaskPriority priority,
                           TaskStatus status, TaskType type, LocalDate date, LocalTime time,
                           Car car, User technician) {

        if (!technician.getRole().equals(Role.TECH)) {
            throw new IllegalArgumentException("Assigned user must be a technician");
        }

        Task task = new Task();
        task.setTitle(title);
        task.setDescription(description);
        task.setPriority(priority);
        task.setStatus(status);
        task.setType(type);
        task.setDate(date);
        task.setTime(time);
        task.setCar(car);
        task.setTechnician(technician);

        return taskRepository.save(task);
    }

    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    public Optional<Task> getTaskById(Long id) {
        return taskRepository.findById(id);
    }

    public List<Task> getTasksByTechnician(String username) {
        return taskRepository.findByTechnicianUsername(username);
    }

    public List<Task> getTasksByCar(Long carId) {
        return taskRepository.findByCarId(carId);
    }

    public List<Task> getTasksByStatus(TaskStatus status) {
        return taskRepository.findByStatus(status);
    }

    public Task updateTaskStatus(Long taskId, TaskStatus newStatus) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new IllegalArgumentException("Task not found"));
        task.setStatus(newStatus);
        return taskRepository.save(task);
    }

    public Task reassignTask(Long taskId, Long newTechnicianId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new IllegalArgumentException("Task not found"));

        User newTechnician = userRepository.findById(newTechnicianId)
                .orElseThrow(() -> new IllegalArgumentException("Technician not found"));

        if (!newTechnician.getRole().equals(Role.TECH)) {
            throw new IllegalArgumentException("Assigned user must be a technician");
        }

        task.setTechnician(newTechnician);
        return taskRepository.save(task);
    }

    public void deleteTask(Long taskId) {
        taskRepository.deleteById(taskId);
    }

    public Task updateTask(Task task) {
        try{
            return  taskRepository.save(task);
        }
        catch (Exception e) {
            throw new IllegalArgumentException("Task not found");
        }
    }
}