package com.example.hatGame.controllers;

import com.example.hatGame.models.Player;
import com.example.hatGame.repositories.PlayerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/players")
public class PlayerController {
    @Autowired
    PlayerRepo playerRepo;
}
