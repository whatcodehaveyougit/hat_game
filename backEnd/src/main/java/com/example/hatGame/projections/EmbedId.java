package com.example.hatGame.projections;

import com.example.hatGame.models.Clue;
import com.example.hatGame.models.Player;
import com.example.hatGame.models.Team;
import org.springframework.data.rest.core.config.Projection;

import java.util.List;

@Projection(name = "embedId", types = Clue.class)
public interface EmbedId {
    Long getId();
    String getContent();
    Boolean getGuessed();
}

