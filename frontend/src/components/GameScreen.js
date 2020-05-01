import React, {useState} from 'react'
import {Link} from 'react-router-dom'

export default function GameScreen(props) {

    return (
        <>
        <h1>{props ? props.selectedTeam.name : null} to go</h1>
        
        <div>Choose a player from your team!</div>
        <Link to="/the-hat-game/player-with-hat">Grab the Hat</Link>

        <h3>Dynamic Scores</h3>
        { props ? props.selectedGame.teams.map((team, index) => (
                <div key={index}> {team.name} : {team.score} </div>
        )) : null }

        </>
    )
}