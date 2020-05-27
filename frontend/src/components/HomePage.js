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
                    <h1>Rules</h1>
                    <p>The Hat Game is quite legendary, lots of people play it but everyone calls it by a different name.</p>
                    <p>For more information on how to use this virtual version of the hat game, <Link to="/rules"><span className="highlight-orange on-hover-underline">please click here.</span></Link></p>

                    <h1>Getting Started</h1>
                    <p>Firstly, get everyone on a zoom call!</p>
                    
                    <p>Nominate 1 person to setup up the game, this begins by clicking the button below.</p>
                    
                    <div>
                        <Link to="/create-game"><button className="yellow-btn create-game-btn on-hover-underline">Create New Game</button></Link> 
                    </div>
                </div>
            </section>
        </>
    )
}