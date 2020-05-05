import React from 'react'
import { Link } from 'react-router-dom'

export default function EmptyHat(props){
    return (
        <>
        <h3>The Hat is empty!</h3>
        <Link to="/the-hat-game"><button onClick={props.endOfRound}>Move to the Next Round!</button></Link> 
        </>
    )
}