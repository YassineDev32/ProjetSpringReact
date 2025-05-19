package com.example.ProjectJEE.service;

import com.example.ProjectJEE.model.Role;
import com.example.ProjectJEE.model.User;
import com.example.ProjectJEE.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UserService {
    private final UserRepository userRepository;

    public UserService(UserRepository userRepository, EmailService emailService) {
        this.userRepository = userRepository;
    }
    // Find user by ID
    public User findUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public List<User> allUsers() {
        List<User> users = new ArrayList<>();
        userRepository.findAll().forEach(users::add);
        return users;
    }
    public User updateUser(User user) {
        return userRepository.save(user);
    }
    public void deleteUser(Long id) {
        if (!userRepository.existsById(id)) {
            throw new IllegalArgumentException("User with ID " + id + " does not exist");
        }
        userRepository.deleteById(id);
    }

    public List<User> findTech(Role role) {
        if (role == Role.TECH) {
            return userRepository.findByRole(role).orElseThrow(
                    () -> new RuntimeException("No techniciens found")
            );
        }
        return null;
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
}