import React, { useEffect } from 'react';
import Games from './Games.js'
import { Link } from 'react-router-dom'
import hat from '../assets/hat.png'
import '../App.css'

export default function HomePage(props) {

    useEffect(() => {
        props.fetchGames()
    }, [])

    return (
        <>
            <section className="main-content">             
                    <Games games={props.games} getPlayers={props.getPlayers} asyncSetSelectedGame={props.asyncSetSelectedGame} />   
                {/* <div className="wrapper"><img className="team animation" src={ hat } /></div> */}

                <div>
                    <h1>Rules & Using this App</h1>
                    <p>Firstly if you don't know the rules of the hat game,
                        <a target="_blank" className="on-hover-underline" href="https://en.wikipedia.org/wiki/Celebrity_(game)"> find out here.</a>
                    </p>
                    <p>Know the rules of the hat game?</p>
                    <p>Wondering how to play it virtually?</p>
                    <p>
                        <Link to="/rules">
                            <button className="on-hover-underline">Learn how here!</button>
                        </Link>
                    </p>

                    <h1>Getting Started</h1>
                    <p>Firstly, get everyone on a zoom call!</p>
                    
                    <p>Nominate 1 person to be the <span className="underline">Game Master</span></p>
                    <p>Game Master: Your destiny is to setup the hat game, please click the button below.</p>
                    
                    <div>
                        <Link to="/create-game"><button className="yellow-btn create-game-btn on-hover-underline">Create New Game</button></Link> 
                    </div>
                </div>
            </section>
        </>
    )
}