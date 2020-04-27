import React, { useState } from 'react';
import Games from './Games.js'

export default function HomePage(props) {
    const [games, setGames] = useState(props);

    return (
        <>
            <a className="create-game-button" href="/create-game">Create Game</a> 
            <Games games={props.games} setSelectedGame={props.setSelectedGame} />
        </>
    )
}