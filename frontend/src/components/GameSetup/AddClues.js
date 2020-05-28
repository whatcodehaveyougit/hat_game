import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import '../../App.css'
import '../../style/game-setup.css'

export default function AddClues(props){

    return(
        <>
            <h2><span className="no-break">Congrats Game Master,</span><span className="no-break"> you did well.</span></h2>

            <p>Please ask everyone to:</p> 

                <p>•Refresh their home page.</p>
                <p>•Select the game you created.</p>
                <p>•Start adding answers to the virutal hat!</p>

            <Link to="/"><button>Return Home</button></Link>
        </>
    )
}