package com.example.hatGame.controllers;

import com.example.hatGame.models.Game;
import com.example.hatGame.repositories.GameRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value="/games")
public class GameController {

    @Autowired
    GameRepo gameRepo;

}
