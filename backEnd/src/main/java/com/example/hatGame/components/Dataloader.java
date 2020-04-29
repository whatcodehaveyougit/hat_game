package com.example.hatGame.components;

import com.example.hatGame.models.Clue;
import com.example.hatGame.models.Game;
import com.example.hatGame.models.Player;
import com.example.hatGame.models.Team;
import com.example.hatGame.repositories.ClueRepo;
import com.example.hatGame.repositories.GameRepo;
import com.example.hatGame.repositories.PlayerRepo;
import com.example.hatGame.repositories.TeamRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.stereotype.Component;

@Component
public class Dataloader implements ApplicationRunner {

    @Autowired
    GameRepo contestRepo;

    @Autowired
    TeamRepo teamRepo;

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

        Clue clue2 = new Clue("12 years a slave", contest1);
        clueRepo.save(clue2);

        Team team1 = new Team("Hummus", contest1);
        teamRepo.save(team1);

        Player player1 = new Player("Jimmy", team1);
        playerRepo.save(player1);

        Player player2 = new Player("Mark", team1);
        playerRepo.save(player2);

    }
}
