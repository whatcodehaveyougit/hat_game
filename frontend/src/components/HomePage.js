import React, { useEffect } from 'react';
import Games from './Games.js'
import hat from '../assets/hat.png'
import '../App.css'

export default function HomePage(props) {

    useEffect(() => {
        props.fetchGames()
    }, [])

    return (
        <>
            <section class="main-content">
               
                <Games games={props.games} getPlayers={props.getPlayers} asyncSetSelectedGame={props.asyncSetSelectedGame} />
            </section>
            <div><img className="team" src={ hat } /></div>
        </>
    )
}