package com.example.hatGame.projections;

import com.example.hatGame.models.Player;
import com.example.hatGame.models.Team;
import org.springframework.data.rest.core.config.Projection;

import java.util.List;

@Projection(name = "embedPlayer", types = Team.class)
public interface EmbedPlayer {
    Long getId();
    String getName();
    Boolean getAddedClues();
    int getScore();
    List<Player> getPlayers();
}

