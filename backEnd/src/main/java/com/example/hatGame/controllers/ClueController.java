package com.example.hatGame.controllers;

import com.example.hatGame.repositories.ClueRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping(value="/clues")
public class ClueController {

    @Autowired
    ClueRepo clueRepo;
}
