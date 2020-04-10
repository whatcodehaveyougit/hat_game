package com.example.hatGame;

import com.example.hatGame.models.Clue;
import com.example.hatGame.models.Contest;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.assertEquals;

public class ContestTest {

    Contest contest;

    @Test
    public void get_contest_name(){
        contest = new Contest("hummus");
        assertEquals("hummus", contest.getTitle());
    }

}
