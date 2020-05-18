package com.example.hatGame.repositories;

import com.example.hatGame.models.Clue;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClueRepo extends JpaRepository<Clue, Long> {
}
