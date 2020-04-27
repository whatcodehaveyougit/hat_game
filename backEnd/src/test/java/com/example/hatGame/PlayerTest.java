package com.example.hatGame;

import com.example.hatGame.models.Game;
import com.example.hatGame.models.Player;
import com.example.hatGame.models.Team;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class PlayerTest {

    Game game;
    Team team;
    Player player;

    @Test
    public void get_player_name(){
        game = new Game("Hummus");
        player = new Player("Sigurd", team);
        assertEquals("Sigurd", player.getName());
    }

    @Test
    public void get_player_team(){
        game = new Game("Hummus");
        player = new Player("Sigurd", team);
        assertEquals("Best Team", player.getTeam());
    }

    @Test
    public void get_player_contest(){
        game = new Game("Hummus");
        player = new Player("Sigurd", team);
        assertEquals(game, player.getTeam());
    }

}
