package com.example.hatGame.components;

import com.example.hatGame.models.Clue;
import com.example.hatGame.models.Game;
import com.example.hatGame.models.Player;
import com.example.hatGame.repositories.ClueRepo;
import com.example.hatGame.repositories.GameRepo;
import com.example.hatGame.repositories.PlayerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class Dataloader implements ApplicationRunner {

    @Autowired
    GameRepo contestRepo;

    @Autowired
    PlayerRepo playerRepo;

    @Autowired
    ClueRepo clueRepo;


    public Dataloader(){}

    @Override
    public void run(ApplicationArguments args){

        Game contest1 = new Game("Hummus");
        contestRepo.save(contest1);

        Clue clue1 = new Clue("007", contest1);
        clueRepo.save(clue1);

        Player player1 = new Player("Jimmy", "best team", contest1);
        playerRepo.save(player1);





    }
}
