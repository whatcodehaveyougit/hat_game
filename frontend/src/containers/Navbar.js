import React from 'react'
import '../style/navbar.css'
import hat from '../assets/hat.png'

export default function() {

    return (
        <>
            <header>
                <title>Hat Game</title>
            </header>

            <nav className="navbar grid-container three-cols">
                <div></div> 
                <div><a href="/" id="page-title"><h1>The Hat Game<img className="hat-in-navbar" src={hat} /></h1></a></div>
            </nav>

        </>
    )
}