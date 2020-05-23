import React, {useState} from 'react'
import {Link } from 'react-router-dom'
import hat from '../assets/hat.png'
import '../App.css'


export default function GameScreen(props) {

    return (
        <>
            <h1>Round { props.selectedGame.round }</h1>
            <h1>{ props.orderedTeams[props.selectedGame.activeTeam].name } to go</h1>
            <h2>Choose a player from your Team</h2>
            
            <div className="game-screen-btn-wrapper">
                <div><button className="big-btn yellow-btn" onClick={props.updateSelectedGame}>Get Up To Date Game Info</button></div>
            </div>

            <div className="scores-wrapper">
                <h3>Scores</h3>
                { props ? props.orderedTeams.map((team, index) => (
                        <div className="team-on-table" key={index}> {team.name} : {team.score} </div>
                )) : null }
            </div>
            <h3>Part of { props.orderedTeams[props.selectedGame.activeTeam].name } ?</h3>
            <h3>Been nominated to go ?</h3>
            <h3>Grab the hat then!</h3>
            <Link to="/the-hat-game/player-with-hat"><img className="hat-on-game-screen" src={hat} /></Link>

        </>
    )
}