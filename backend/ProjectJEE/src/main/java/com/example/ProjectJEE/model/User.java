package com.example.ProjectJEE.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "users")
@Getter
@Setter
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = true)
    private String firstname;

    @Column(nullable = true)
    private String lastname;

    @Column(nullable = true)
    private String CIN;

    @Column(nullable = true)
    private String numeroTel;

    @Column(unique = true, nullable = false)
    private String username;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @Column(name = "verification_code")
    private String verificationCode;

    @Column(name = "verification_expiration")
    private LocalDateTime verificationCodeExpiresAt;

    private boolean enabled;

    @Enumerated(EnumType.STRING)
    private Role role;  // Champ pour le rôle (USER, ADMIN)

    private String resetPasswordToken;
    private LocalDateTime resetPasswordTokenExpiresAt;

    // Constructor for creating an unverified user
    public User(String username, String email, String password, Role role) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.role = role;
    }

    // Default constructor
    public User() {
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Return the role prefixed with "ROLE_" to comply with Spring Security standards
        return List.of(() -> "ROLE_" + role.name().toUpperCase());
    }

    @Override
    public boolean isAccountNonExpired() {
        // Implement if needed to check expiration logic
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        // Implement if needed to check lock logic
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        // Implement if needed to check credentials expiration
        return true;
    }

    @Override
    public boolean isEnabled() {
        // Return the user's enabled status for Spring Security
        return enabled;
    }

    // Méthode pour vérifier si le token de réinitialisation de mot de passe a expiré
    public boolean isResetPasswordTokenExpired() {
        return resetPasswordTokenExpiresAt != null && resetPasswordTokenExpiresAt.isBefore(LocalDateTime.now());
    }

    // Méthode pour vérifier si le code de vérification a expiré
    public boolean isVerificationCodeExpired() {
        return verificationCodeExpiresAt != null && verificationCodeExpiresAt.isBefore(LocalDateTime.now());
    }
}
