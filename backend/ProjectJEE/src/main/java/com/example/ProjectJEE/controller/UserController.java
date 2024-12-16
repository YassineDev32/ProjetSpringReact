package com.example.ProjectJEE.controller;

import com.example.ProjectJEE.model.User;
import com.example.ProjectJEE.service.JwtService;
import com.example.ProjectJEE.service.UserService;
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
    @PreAuthorize("hasRole('USER')")
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


}
