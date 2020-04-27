import React, {useState} from 'react'
import { Redirect } from 'react-router-dom'
import '../App.css'

export default function GameHome(props) {
    const [readyPlayersCount, setReadyPlayersCount] = useState(0) 
    const [playerReadyCss, setPlayerReadyCss] = useState(false)

    function playerReady(){
        setReadyPlayersCount(readyPlayersCount + 1)
    }

    if(readyPlayersCount >= props.game.players.length ){
        return <Redirect to='/my-hat-game'/>
    }



    return (
        <>
            {/* <h1>{ title }</h1> */}
            <p>This is a component to be renders on the dynamic game route</p>
            <h1>{props.game.title}</h1>
            <h3>Players Ready : {readyPlayersCount}</h3>
            { props ? props.game.players.map((player, index) => (
                <div key={index} className={`${playerReadyCss} ? player-ready : null`} >Name: {player.name} <br/>Team: {player.team} </div>
    )) : null  }

            <button onClick={playerReady} >Ready to Play!</button>

        </>
    )
}

