package com.example.hatGame.models;

import javax.persistence.*;

@Entity
@Table(name = "players")
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long Id;

    @Column(name="name")
    private String name;

    @ManyToOne(cascade = CascadeType.REMOVE)
    @JoinColumn(name="team_id", nullable = false)
    private Team team;

    public Player(String name, Team team){
        this.Id = Id;
        this.name = name;
        this.team = team;
    }

    public Player(){
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

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

}
