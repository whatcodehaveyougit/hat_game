package com.example.hatGame.projections;

import com.example.hatGame.models.Clue;
import com.example.hatGame.models.Game;
import com.example.hatGame.models.Team;
import org.springframework.data.rest.core.config.Projection;

import java.util.List;

@Projection(name="embedCluesAndTeams", types = Game.class)
public interface EmbedCluesAndTeams {
    Long getId();
    String getTitle();
    int getActiveTeam();
    int getRound();
    List<Team> getTeams();
    List<Clue> getClues();
}
