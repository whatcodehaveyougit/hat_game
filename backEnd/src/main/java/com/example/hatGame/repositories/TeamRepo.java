package com.example.hatGame.repositories;

import com.example.hatGame.models.Team;
import com.example.hatGame.projections.EmbedCluesAndTeams;
import com.example.hatGame.projections.EmbedPlayer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@RepositoryRestResource(excerptProjection = EmbedPlayer.class)
public interface TeamRepo extends JpaRepository<Team, Long> {
}

