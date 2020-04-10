package com.example.hatGame.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "contests")
public class Contest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="title")
    private String title;

    @JsonIgnore
    @OneToMany(mappedBy = "contest", cascade = CascadeType.REMOVE)
    private List<Player> players;

    @JsonIgnore
    @OneToMany(mappedBy = "contest", cascade = CascadeType.REMOVE)
    private List<Clue> clues;

    public Contest(String title){
        this.id = id;
        this.title = title;
        this.players = new ArrayList<Player>();
        this.clues = new ArrayList<Clue>();
    }

    public Contest(){
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<Player> getPlayers() {
        return players;
    }

    public void setPlayers(List<Player> players) {
        this.players = players;
    }

    public List<Clue> getClues() {
        return clues;
    }

    public void setClues(List<Clue> clues) {
        this.clues = clues;
    }
}
