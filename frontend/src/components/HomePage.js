import React, { useState } from 'react';
import Games from './Games.js'

export default function HomePage(props) {
    const [games, setGames] = useState(props);

    return (
        <>
            <a class="create-game-button" href="/create-game">Create Game</a> 
            <Games games={props.games}/>
        </>
    )
}