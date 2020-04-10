package com.example.hatGame;

import com.example.hatGame.models.Clue;
import com.example.hatGame.models.Contest;
import com.example.hatGame.models.Player;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class PlayerTest {

    Contest contest;
    Player player;

    @Test
    public void get_player_name(){
        contest = new Contest("Hummus");
        player = new Player("Sigurd", "Best Team", contest);
        assertEquals("Sigurd", player.getName());
    }

    @Test
    public void get_player_team(){
        contest = new Contest("Hummus");
        player = new Player("Sigurd", "Best Team", contest);
        assertEquals("Best Team", player.getTeam());
    }

    @Test
    public void get_player_contest(){
        contest = new Contest("Hummus");
        player = new Player("Sigurd", "Best Team", contest);
        assertEquals(contest, player.getContest());
    }

}
