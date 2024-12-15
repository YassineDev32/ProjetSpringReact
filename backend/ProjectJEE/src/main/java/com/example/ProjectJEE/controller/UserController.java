package com.example.ProjectJEE.controller;

import com.example.ProjectJEE.model.User;
import com.example.ProjectJEE.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/user")
@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
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
}
