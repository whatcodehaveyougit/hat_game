import React, { useState } from 'react';
import Games from './Games.js'

export default function HomePage(props) {
    const [games, setGames] = useState(props);

    return (
        <>
            <Games games={props.games}/>
        </>
    )
}