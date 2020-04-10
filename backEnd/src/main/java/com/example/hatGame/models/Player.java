package com.example.hatGame.models;

import javax.persistence.*;
import java.util.List;

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
    @JoinColumn(name="contest_id", nullable = false)
    private Contest contest;

    public Player(String name, String team, Contest contest){
        this.id = id;
        this.name = name;
        this.team = team;
        this.contest = contest;
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

    public Contest getContest() {
        return contest;
    }

    public void setContest(Contest contest) {
        this.contest = contest;
    }
}
