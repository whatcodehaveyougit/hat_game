import React from 'react'
import { Link } from 'react-router-dom'

export default function EmptyHat(props){

    function handleClick(){
        props.setDisplayButton(true)
        props.endOfTurn()
        props.endOfRound()
    }
    return (
        <>
        <h3>The Hat is empty!</h3>
        <Link to="/the-hat-game"><button onClick={handleClick}>Move to the Next Round!</button></Link> 
        </>
    )
}