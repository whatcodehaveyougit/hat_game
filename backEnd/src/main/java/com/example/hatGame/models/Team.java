package com.example.hatGame.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "teams")
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

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
        this.Id = Id;
        this.name = name;
        this.score = score;
        this.players = players;
        this.game = game;
    }

    public Team() {
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        this.Id = Id;
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