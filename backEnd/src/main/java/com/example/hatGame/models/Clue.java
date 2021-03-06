package com.example.hatGame.models;

import javax.persistence.*;

@Entity
@Table(name = "clues")
public class Clue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column(name="content")
    private String content;

    @Column(name="guessed")
    private Boolean guessed;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name="game_id", nullable = false)
    private Game game;

    public Clue(String content, Boolean guessed, Game game){
        this.Id = Id;
        this.content = content;
        this.guessed = guessed;
        this.game = game;
    }

    public Clue(){
    }

    public Long getId() {
        return Id;
    }

    public void setId(Long id) {
        this.Id = Id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Boolean getGuessed() {
        return guessed;
    }

    public void setGuessed(Boolean guessed) {
        this.guessed = guessed;
    }

    public Game getGame() {
        return game;
    }

    public void getGame(Game game) {
        this.game = game;
    }


}
