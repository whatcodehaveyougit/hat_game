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

        Game contest1 = new Game("The FA Cup of Hat Games");
        contestRepo.save(contest1);

        Clue clue1 = new Clue("Bob Odenkirk", false, contest1);
        clueRepo.save(clue1);

        Clue clue2 = new Clue("12 years a slave",false, contest1);
        clueRepo.save(clue2);

        Clue clue3 = new Clue("Christian Bale",false, contest1);
        clueRepo.save(clue3);

        Clue clue4 = new Clue("Jimmy McGill",false, contest1);
        clueRepo.save(clue4);

        Team team1 = new Team("Team 1", contest1);
        teamRepo.save(team1);

        Team team2 = new Team("Team 2", contest1);
        teamRepo.save(team2);

        Team team3 = new Team("Team 3", contest1);
        teamRepo.save(team3);

        Player player1 = new Player("Jimmy", team1);
        playerRepo.save(player1);

        Player player2 = new Player("Mark", team1);
        playerRepo.save(player2);

        Player player3 = new Player("Sandy", team1);
        playerRepo.save(player3);

        Player player4 = new Player("Thorfin", team1);
        playerRepo.save(player4);

    }
}
