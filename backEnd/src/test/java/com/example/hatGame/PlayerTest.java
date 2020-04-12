package com.example.hatGame;

import com.example.hatGame.models.Game;
import com.example.hatGame.models.Player;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class PlayerTest {

    Game game;
    Player player;

    @Test
    public void get_player_name(){
        game = new Game("Hummus");
        player = new Player("Sigurd", "Best Team", game);
        assertEquals("Sigurd", player.getName());
    }

    @Test
    public void get_player_team(){
        game = new Game("Hummus");
        player = new Player("Sigurd", "Best Team", game);
        assertEquals("Best Team", player.getTeam());
    }

    @Test
    public void get_player_contest(){
        game = new Game("Hummus");
        player = new Player("Sigurd", "Best Team", game);
        assertEquals(game, player.getGame());
    }

}
