import React, {useState} from 'react'
import {Link } from 'react-router-dom'

export default function GameScreen(props) {

    return (
        <>
        <h1>{ props.gameOver ? "Game Over!" : "Round:" + props.currentRound } </h1>
        <h1>{props.gameOver ? null : props.selectedTeam.name + " to go" }</h1>
        
        <div>{ props.gameOver ? null : "Choose a player from your team!" }</div>
        <div>{ props.gameOver ? null :  <Link to="/the-hat-game/player-with-hat">Grab the Hat</Link>}</div>

        <h3>Scores</h3>
        { props ? props.selectedGame.teams.map((team, index) => (
                <div key={index}> {team.name} : {team.score} </div>
        )) : null }

        </>
    )
}