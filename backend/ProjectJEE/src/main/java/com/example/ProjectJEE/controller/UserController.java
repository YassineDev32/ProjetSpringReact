package com.example.ProjectJEE.controller;

import com.example.ProjectJEE.model.Role;
import com.example.ProjectJEE.model.User;
import com.example.ProjectJEE.service.JwtService;
import com.example.ProjectJEE.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RequestMapping("/user")
@RestController
public class UserController {

    private final UserService userService;
    private final JwtService jwtService;

    public UserController(UserService userService, JwtService jwtService) {
        this.userService = userService;
        this.jwtService = jwtService;
    }

    // Endpoint pour récupérer l'utilisateur authentifié
    @GetMapping("/me")
    @PreAuthorize("hasRole('USER')")  // Permet à un utilisateur avec le rôle 'USER' d'accéder à cet endpoint
    public ResponseEntity<User> authenticatedUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();
        return ResponseEntity.ok(currentUser);
    }

    // Endpoint pour récupérer tous les utilisateurs (accessible uniquement aux admins)
    @GetMapping("/")
    @PreAuthorize("hasRole('ADMIN')")  // Seulement les utilisateurs avec le rôle 'ADMIN' peuvent accéder à cet endpoint
    public ResponseEntity<List<User>> allUsers() {
        List<User> users = userService.allUsers();
        return ResponseEntity.ok(users);
    }


    @PutMapping("/update")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Map<String, Object>> updateUser(@RequestBody User updatedUser) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        User currentUser = (User) authentication.getPrincipal();

        // Mettre à jour les champs nécessaires
        currentUser.setUsername(updatedUser.getUsername());
        currentUser.setFirstname(updatedUser.getFirstname());
        currentUser.setLastname(updatedUser.getLastname());
        currentUser.setCIN(updatedUser.getCIN());
        currentUser.setNumeroTel(updatedUser.getNumeroTel());
        currentUser.setEmail(updatedUser.getEmail());
        // Sauvegarder les changements
        User savedUser = userService.updateUser(currentUser);
        // Générer un nouveau token
        String newToken = jwtService.generateToken(savedUser);
        // Créer la réponse
        Map<String, Object> response = new HashMap<>();
        response.put("user", savedUser);
        response.put("token", newToken);

        return ResponseEntity.ok(response);
    }

    @PutMapping("/update/{id}")
    @PreAuthorize("hasRole('ADMIN')") // Only admins can access this endpoint
    public ResponseEntity<Map<String, Object>> updateUserById(
            @PathVariable Long id,
            @RequestBody Map<String, Object> updatedFields) {
        // Find the user by ID
        User existingUser = userService.findUserById(id);
        if (existingUser == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "User not found"));
        }

        // Update only the fields provided in the request body
        if (updatedFields.containsKey("username")) {
            existingUser.setUsername((String) updatedFields.get("username"));
        }
        if (updatedFields.containsKey("email")) {
            existingUser.setEmail((String) updatedFields.get("email"));
        }
        if (updatedFields.containsKey("numeroTel")) {
            existingUser.setNumeroTel((String) updatedFields.get("numeroTel"));
        }
        if (updatedFields.containsKey("role")) {
            existingUser.setRole(Role.valueOf((String) updatedFields.get("role")));
        }

        // Save the updated user
        User savedUser = userService.updateUser(existingUser);

        // Generate a new JWT token
        String newToken = jwtService.generateToken(savedUser);

        // Create a response
        Map<String, Object> response = new HashMap<>();
        response.put("user", savedUser);
        response.put("token", newToken); // Include the new token in the response
        response.put("message", "User updated successfully");

        return ResponseEntity.ok(response);
    }


    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasRole('ADMIN')") // Only admins can delete users
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        try {
            userService.deleteUser(id);
            return ResponseEntity.ok(Map.of("message", "User deleted successfully"));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "An error occurred while deleting the user"));
        }
    }
}
