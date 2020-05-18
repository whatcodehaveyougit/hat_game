import React, {useState, useEffect} from 'react'
import { Redirect, Link } from 'react-router-dom'
import '../App.css'

export default function ReadyToPlay(props) {
    const [haveAllPlayersAddedClues, setHaveAllPlayersAddedClues] = useState(false)

    useEffect(() => {
        console.log(props.selectedGamePlayers);
        checkIfAllPlayersAddedClues()
    })

    function checkIfAllPlayersAddedClues(){
        const counter = 0;
        props.selectedGamePlayers.forEach(player => {
            if(player.added_clues){
                counter++
            }
        });
        if (counter === props.selectedGamePlayers){
           setHaveAllPlayersAddedClues(true)
        }
    }

    if(props.selectedGame){
        if (props.selectedGame.round > 3){
            return <Redirect to='/game-over'/>
        }
    } 

    return (
        <> 
        { haveAllPlayersAddedClues ?
            <div>
                <h1>{ props.selectedGame.title }</h1>
                <h1>ARE YOU READY?</h1>
                <Link to="/the-hat-game"><button>Aye!</button></Link>
            </div>  
        :
            <div>
                <h1>Everyone Please Add Their Clues to the Hat</h1>
                <Link to='/add-clues-home'><button>Click Here to Add Your Clues</button></Link>
            </div>     
        }
    </>
    )
}

