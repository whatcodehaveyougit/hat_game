import React, { useEffect } from 'react';
import Games from './Games.js'

export default function HomePage(props) {

    useEffect(() => {
        props.fetchGames()
    }, [])

    return (
        <>
            <a className="create-game-button" href="/create-game">Create Game</a> 
            <Games games={props.games} getPlayers={props.getPlayers} asyncSetSelectedGame={props.asyncSetSelectedGame} />
        </>
    )
}