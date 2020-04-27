package com.example.hatGame.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "teams")
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "score")
    private int score;

    @JsonIgnore
    @OneToMany(mappedBy = "team", cascade = CascadeType.REMOVE)
    private List<Player> players;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name="game_id", nullable = false)
    private Game game;

    public Team(String name, Game game) {
        this.id = id;
        this.name = name;
        this.score = score;
        this.players = players;
        this.game = game;
    }

    public Team() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    public List<Player> getPlayers() {
        return players;
    }

    public void setPlayers(List<Player> players) {
        this.players = players;
    }

    public Game getGame() {
        return game;
    }

    public void setGame(Game game) {
        this.game = game;
    }
}