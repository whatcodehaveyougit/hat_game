package com.example.hatGame.models;

import javax.persistence.*;

@Entity
@Table(name = "players")
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="name")
    private String name;

    @Column(name="team")
    private String team;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name="game_id", nullable = false)
    private Game game;

    public Player(String name, String team, Game game){
        this.id = id;
        this.name = name;
        this.team = team;
        this.game = game;
    }

    public Player(){
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

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public Game getGame() {
        return game;
    }

    public void getGame(Game game) {
        this.game = game;
    }
}
