import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import '../../App.css'
import '../../style/game-setup.css'

export default function AddClues(props){

    return(
        <>
            <h2>Now, as game master you need to:</h2>

            <h3>Tell everyone to refresh their page and start adding answers!</h3>

            <h3>Then... feel free to</h3>

            <Link to="/"><button>Start Adding Answers</button></Link>
        </>
    )
}