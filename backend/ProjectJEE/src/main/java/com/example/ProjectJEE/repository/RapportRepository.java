package com.example.ProjectJEE.repository;

import com.example.ProjectJEE.model.Rapport;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RapportRepository extends JpaRepository<Rapport, Long> {
}
