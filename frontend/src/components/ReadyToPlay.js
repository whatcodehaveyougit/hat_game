import React, {useState, useEffect} from 'react'
import { Redirect } from 'react-router-dom'
import '../App.css'

export default function ReadyToPlay(props) {
    const [readyTeamsCount, setReadyTeamsCount] = useState(0) 
    const [playerReadyCss, setPlayerReadyCss] = useState(false)


    useEffect(() => {
       console.log("useEffect running");
       props.changeSelectedTeam()
    }, [])

    function playerReady(){
        setReadyTeamsCount(readyTeamsCount + 1)
    }

    if(readyTeamsCount >= props.game.teams.length ){
        return <Redirect to='/the-hat-game'/>
    }

    return (
        <>
            <h1>{ props.game.title }</h1>
            <h3>Teams Ready To Play! : {readyTeamsCount}</h3>
            <div className="grid-container three-cols">
            { props ? props.game.teams.map((team, index) => (
                <div>
                    <div key={index} className={`${playerReadyCss} ? player-ready : null`} > Are team {team.name} ready to play?</div>
                    <button key={team} onClick={playerReady} >Aye!</button>
                </div>
    )) : null  }
            </div>
            

        </>
    )
}

