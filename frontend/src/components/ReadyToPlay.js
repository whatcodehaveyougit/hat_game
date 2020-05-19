import React, {useState, useEffect} from 'react'
import { Redirect, Link } from 'react-router-dom'
import '../App.css'

export default function ReadyToPlay(props) {
    const [haveAllPlayersAddedClues, setHaveAllPlayersAddedClues] = useState(false)

    useEffect(() => {
        console.log(props.selectedGame + "from ready");
        checkIfAllPlayersAddedClues() 
    }, [props.selectedGamePlayers])

    // Don't need this - will just over complicate - when they are ready just let them through
    function checkIfAllPlayersAddedClues(){

        const counter = 0;
        console.log(props.selectedGamePlayers);  
        props.selectedGamePlayers.forEach(player => {
            if(player.added_clues){
                counter++
                console.log("player has added clues");
            }
        });
        if (counter === props.selectedGamePlayers.length){
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
        { haveAllPlayersAddedClues ? null :
            <div>
                <h1>Everyone Please Add Their Clues to the Hat</h1>
                <Link to='/add-clues-home'><button>Click Here to Add Your Clues</button></Link>
            </div>     
        }
            <div>
                <h1>{ props.selectedGame.title }</h1>
                <h1>ARE YOU READY?</h1>
                <Link to="/the-hat-game"><button>Aye!</button></Link>
            </div>  
       
    </>
    )
}

