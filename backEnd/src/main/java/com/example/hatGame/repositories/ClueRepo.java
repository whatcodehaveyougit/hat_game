package com.example.hatGame.repositories;

import com.example.hatGame.models.Clue;
import com.example.hatGame.projections.EmbedCluesAndTeams;
import com.example.hatGame.projections.EmbedId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

@RepositoryRestResource(excerptProjection = EmbedId.class)
public interface ClueRepo extends JpaRepository<Clue, Long> {
}
