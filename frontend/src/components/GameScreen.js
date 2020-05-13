import React, {useState} from 'react'
import {Link } from 'react-router-dom'

export default function GameScreen(props) {

    return (
        <>
        <h1>{ props.gameOver ? "Game Over!" : "Round:" + props.selectedGame.round } </h1>
        <h1>{props.gameOver ? null : props.orderedTeams[props.selectedGame.activeTeam].name + " to go" }</h1>
        
        <div>{ props.gameOver ? null : "Choose a player from your team!" }</div>
        <div>{ props.gameOver ? null :  <Link to="/the-hat-game/player-with-hat">Grab the Hat</Link>}</div>
        <button onClick={props.updateSelectedGame}>Update Game Info</button>
        <h3>Scores</h3>
        { props ? props.orderedTeams.map((team, index) => (
                <div key={index}> {team.name} : {team.score} </div>
        )) : null }

        </>
    )
}