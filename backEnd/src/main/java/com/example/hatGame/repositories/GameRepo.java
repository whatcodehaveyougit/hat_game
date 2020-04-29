package com.example.hatGame.repositories;

import com.example.hatGame.models.Game;
import com.example.hatGame.projections.EmbedCluesAndTeams;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

@RepositoryRestResource(excerptProjection = EmbedCluesAndTeams.class)
public interface GameRepo extends JpaRepository<Game, Long> {
}
