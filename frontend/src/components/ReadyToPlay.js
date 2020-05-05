import React, {useState, useEffect} from 'react'
import { Redirect } from 'react-router-dom'
import '../App.css'

export default function ReadyToPlay(props) {
    const [readyTeamsCount, setReadyTeamsCount] = useState(0) 
    const [playerReadyCss, setPlayerReadyCss] = useState(false)

    function playerReady(){
        setReadyTeamsCount(readyTeamsCount + 1)
    }

    if(readyTeamsCount >= props.game.teams.length ){
        props.startRoundWithTeamOne()
        return <Redirect to='/the-hat-game'/>
    }

    return (
        <>
            <h1>{ props.game.title }</h1>
            <h3>Teams Ready To Play! : {readyTeamsCount}</h3>
            <div className="grid-container three-cols">
            { props ? props.game.teams.map((team, index) => (
                <div key={index}>
                    <div className={`${playerReadyCss} ? player-ready : null`} > Are team {team.name} ready to play?</div>
                    <button onClick={playerReady} >Aye!</button>
                </div>
    )) : null  }
            </div>
            

        </>
    )
}

