import React from 'react'

export default function GameHome(props) {
    // console.log(props.game.players.map((player) =>  {player.name}))
    
    return (
        <>
            {/* <h1>{ title }</h1> */}
            <p>This is a component to be renders on the dynamic game route</p>
            <h1>{props.game.title}</h1>
            { props ? props.game.players.map((player, index) => (
                <div key={index} className="game" >Name: {player.name} <br/>Team: {player.team} </div>
    )) : null  }


        </>
    )
}

