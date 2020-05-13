import React, {useState} from 'react'
import { Link } from 'react-router-dom'

export default function TurnOverScreen(props){

    function handleRedirect(){
        props.setDisplayButton(true)
        props.endOfTurn()
    }
    

    return (
        <>
            <h1>Time is Out!!</h1>
            <Link to="/the-hat-game" onClick={handleRedirect}>Return to Game Screen</Link>
        </>
    )
}