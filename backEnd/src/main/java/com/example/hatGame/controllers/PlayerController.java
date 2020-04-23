package com.example.hatGame.controllers;

import com.example.hatGame.models.Player;
import com.example.hatGame.repositories.PlayerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value="/players")
public class PlayerController {
    @Autowired
    PlayerRepo playerRepo;
}
