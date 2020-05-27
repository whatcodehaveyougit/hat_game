import React, {useEffect} from 'react'
import { Link } from 'react-router-dom'

export default function EmptyHat(props){

    async function endOfRound(){
        await props.endOfTurn()   
        await props.endOfRound()
    }

    // This is the hack that I used so that both the endOfTurn function and endOfRound would run and do their job
    // Without this fix they would both run but not complete their database operations.  
    // Maybe call these 2 functiosn together was putting too much strain on the DB ?
  

    return (
        <>
        <h3>The Hat is empty!</h3>
        <p>NB : Your team does not get the remaining amount of time on the clock in the virtual hat game, sorry!</p>
        {/* <p>After clicking the button below please press "Update Game Info"</p> */}
        <Link to="/the-hat-game"><button onClick={endOfRound}>Move to the Next Round!</button></Link> 
        </>
    )
}