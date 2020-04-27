package com.example.hatGame.repositories;

import com.example.hatGame.models.Team;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TeamRepo extends JpaRepository<Team, Long> {
}

