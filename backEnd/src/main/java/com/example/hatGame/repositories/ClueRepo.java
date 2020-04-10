package com.example.hatGame.repositories;

import com.example.hatGame.models.Clue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ClueRepo extends JpaRepository<Clue, Long> {
}
