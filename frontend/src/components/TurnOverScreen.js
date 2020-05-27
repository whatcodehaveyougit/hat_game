import React from 'react'
import { Link } from 'react-router-dom'

export default function TurnOverScreen(props){

    return (
        <>
            <> 
            <h1>Time is Out!!</h1>
            <Link to="/the-hat-game" onClick={props.endOfTurn}>
                <button className="big-btn yellow-btn turn-over-btn">Return to Game Screen</button> 
            </Link> 
            </>
        </>
    )
}