import React from 'react'
import '../style/navbar.css'
import hat from '../assets/hat.png'

export default function() {

    return (
        <>
            <head>
                <title>Hat Game</title>
            </head>

            <nav class="navbar">
                <a href="/" id="page-title"><h1>The Hat Game<img className="hat-in-navbar" src={hat} /></h1></a>
                <a className="create-game-button" href="/create-game">Create New Game</a> 

            </nav>

        </>
    )
}