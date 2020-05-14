import React from 'react'
import { Link, Redirect } from 'react-router-dom'

export default function TurnOverScreen(props){

    // function endOfTurn(){
    //     props.endOfTurn()
    // }

    return (
        <>
           {/* This is not working for some reason */}
            {/* { props.emptyHatRedirect ? <Redirect to='/the-hat-is-empty'/> :   */}
            <> 
            <h1>Time is Out!!</h1>
            <Link to="/the-hat-game" onClick={props.endOfTurn}>Return to Game Screen</Link> 
            </>
        </>
    )
}