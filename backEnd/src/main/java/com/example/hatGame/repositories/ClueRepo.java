package com.example.hatGame.repositories;

import com.example.hatGame.models.Clue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

public interface ClueRepo extends JpaRepository<Clue, Long> {
}
