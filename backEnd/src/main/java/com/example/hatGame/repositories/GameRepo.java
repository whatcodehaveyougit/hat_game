package com.example.hatGame.repositories;

import com.example.hatGame.models.Game;
import com.example.hatGame.projections.EmbedCluesAndPlayers;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@RepositoryRestResource(excerptProjection = EmbedCluesAndPlayers.class)
public interface GameRepo extends JpaRepository<Game, Long> {
}
