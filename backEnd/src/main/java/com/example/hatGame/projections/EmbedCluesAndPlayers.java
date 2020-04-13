package com.example.hatGame.projections;

import com.example.hatGame.models.Clue;
import com.example.hatGame.models.Game;
import com.example.hatGame.models.Player;
import org.springframework.data.rest.core.config.Projection;

import java.util.List;

@Projection(name="embedCluesAndPlayers", types = Game.class)
public interface EmbedCluesAndPlayers {
    Long getId();
    String getTitle();
    List<Clue> getClues();
    List<Player> getPlayers();
}
