package com.example.ProjectJEE.repository;

import com.example.ProjectJEE.model.Role;
import com.example.ProjectJEE.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByVerificationCode(String verificationCode);
    Optional<User> findByUsername(String username);
    Optional<User> findByResetPasswordToken(String token);
    Optional<List<User>> findByRole(Role role);
    
}