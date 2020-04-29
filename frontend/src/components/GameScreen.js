import React, {useState} from 'react'
import {Link} from 'react-router-dom'

import ActivePlayerScreen from './ActivePlayerScreen'

export default function GameScreen(props) {
console.log(props);

    return (
        <>
        <h1>{props ? props.selectedGame.teams[0].name : null} to go now </h1>
        
        <div>Choose a player from your team!</div>
        <Link to="/the-hat-game/player-with-hat">Grab the Hat</Link>

        <h3>Dynamic Scores</h3>
        { props ? props.selectedGame.teams.map((team, index) => (
                <div key={index}> {team.name} : {team.score} </div>
        )) : null }

        </>
    )
}