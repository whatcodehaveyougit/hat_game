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
    @JoinColumn(name="contest_id", nullable = false)
    private Contest contest;

    public Clue(String content, Contest contest){
        this.id = id;
        this.content = content;
        this.contest = contest;
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

    public Contest getContest() {
        return contest;
    }

    public void setContest(Contest contest) {
        this.contest = contest;
    }

}
