import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import '../../App.css'

export default function AddClues(props){

    return(
        <>
            <h2>Now, as game master you need to:</h2>

            <h3>Tell every to refresh their page and start adding clues!</h3>

            <h3>Then... feel free to</h3>

            <Link to="/add-clues-home"><button>Start Adding Clues</button></Link>
        </>
    )
}