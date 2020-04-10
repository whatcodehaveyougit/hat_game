package com.example.hatGame;

import com.example.hatGame.models.Clue;
import com.example.hatGame.models.Contest;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ClueTest {

    Contest contest;
    Clue clue;

    @Test
    public void get_clue_name(){
        contest = new Contest("Hummus");
        clue = new Clue("sword", contest);
        assertEquals("sword", clue.getContent());
    }
    
}
