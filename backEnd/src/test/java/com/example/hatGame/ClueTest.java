package com.example.hatGame;

import com.example.hatGame.models.Clue;
import com.example.hatGame.models.Game;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ClueTest {

    Game contest;
    Clue clue;

    @Test
    public void get_clue_name(){
        contest = new Game("Hummus");
        clue = new Clue("sword", false, contest);
        assertEquals("sword", clue.getContent());
    }
    
}
