package com.example.ProjectJEE.dto;

import com.example.ProjectJEE.model.Role;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RegisterUserDto {
    private String email;
    private String password;
    private String username;
    private Role role;  // Champ ajouté pour spécifier le rôle de l'utilisateur
}
