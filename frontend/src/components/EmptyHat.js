import React from 'react'
import { Link } from 'react-router-dom'

export default function EmptyHat(){
    return (
        <>
        <Link to="/the-hat-game">Return to Game Screen</Link> 
        "The hat is empty!"
        </>
    )
}