import React, {useState} from 'react'
import {Link } from 'react-router-dom'
import EmptyHat from './RoundOver.js'
import '../App.css'

export default function GameScreen(props) {

    return (
        <>
            <h1>Round { props.selectedGame.round }</h1>
            <h1>{ props.orderedTeams[props.selectedGame.activeTeam].name } to go</h1>
            
            <h2>Choose a player from your team!</h2>
            <div><button className="button-link"><Link to="/the-hat-game/player-with-hat">Grab the Hat</Link></button></div>
            <button onClick={props.updateSelectedGame}>Update Game Info</button>

            <h3>Scores</h3>
            { props ? props.orderedTeams.map((team, index) => (
                    <div key={index}> {team.name} : {team.score} </div>
            )) : null }

        </>
    )
}