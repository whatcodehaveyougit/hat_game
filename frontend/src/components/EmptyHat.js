import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'

export default function EmptyHat(props){

    useEffect(() => {
        props.endOfTurn()
    })

    // This is the hack that I used so that both the endOfTurn function and endOfRound would run and do their job
    // Without this fix they would both run but not complete their database operations.  
    // Maybe call these 2 functiosn together was putting too much strain on the DB ?
  

    return (
        <>
        <h3>The Hat is empty!</h3>
        <Link to="/the-hat-game"><button onClick={props.endOfRound}>Move to the Next Round!</button></Link> 
        </>
    )
}