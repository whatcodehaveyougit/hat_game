package com.example.hatGame.models;

import javax.persistence.*;

@Entity
@Table(name = "clues")
public class Clue {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="content")
    private String content;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name="game_id", nullable = false)
    private Game game;

    public Clue(String content, Game game){
        this.id = id;
        this.content = content;
        this.game = game;
    }

    public Clue(){
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Game getGame() {
        return game;
    }

    public void getGame(Game game) {
        this.game = game;
    }

}
