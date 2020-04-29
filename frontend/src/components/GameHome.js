import React, {useState} from 'react'
import { Redirect } from 'react-router-dom'
import '../App.css'

export default function GameHome(props) {
    const [readyTeamsCount, setReadyTeamsCount] = useState(0) 
    const [playerReadyCss, setPlayerReadyCss] = useState(false)

    function playerReady(){
        setReadyTeamsCount(readyTeamsCount + 1)
    }

    if(readyTeamsCount >= props.game.teams.length ){
        return <Redirect to='/my-hat-game'/>
    }

    return (
        <>
            <h1>{ props.game.title }</h1>
             <p>This is a component to be renders on the dynamic game route</p>
            <h1>{props.game.title}</h1>
            <h3>Teams Ready To Play! : {readyTeamsCount}</h3>
            { props ? props.game.teams.map((team, index) => (
                <div key={index} className={`${playerReadyCss} ? player-ready : null`} > Are team {team.name} ready to play?</div>
    )) : null  }

            <button onClick={playerReady} >Aye!</button>

        </>
    )
}

