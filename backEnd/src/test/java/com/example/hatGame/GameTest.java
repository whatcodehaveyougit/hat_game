package com.example.hatGame;

import com.example.hatGame.models.Game;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class GameTest {

    Game game;

    @Test
    public void get_contest_name(){
        game = new Game("hummus");
        assertEquals("hummus", game.getTitle());
    }

}
