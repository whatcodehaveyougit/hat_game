package com.example.hatGame.repositories;

import com.example.hatGame.models.Contest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ContestRepo extends JpaRepository<Contest, Long> {
}
