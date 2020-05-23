import React, {useState, useEffect} from 'react'
import { Redirect, Link } from 'react-router-dom'
import '../App.css';
import letsGo from '../assets/letsGo.png';

export default function ReadyToPlay(props) {
    const [haveAllPlayersAddedClues, setHaveAllPlayersAddedClues] = useState(false)
    const [numberOfPlayersToAddClues, setNumberOfPlayersToAddClues] = useState()

    useEffect(() => {
        checkIfAllPlayersAddedClues() 
    }, [props.selectedGamePlayers])

    // Don't need this - will just over complicate - when they are ready just let them through
    function checkIfAllPlayersAddedClues(){
        let counter = 0;
        props.selectedGamePlayers.forEach(player => {
            if(player.addedClues){
                counter++
                console.log("player has added clues");
            }
            const remainingPlayersCount = props.selectedGamePlayers.length - counter
            setNumberOfPlayersToAddClues(remainingPlayersCount)
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
        { haveAllPlayersAddedClues ? 
            <div>
                <h1>The clues have been added...</h1>
                <h1>Trash talk has been dished...</h1>
                <h1>Now it's time to play</h1>
                <h1>{ props.selectedGame.title }</h1>
                <h1>ARE YOU READY?</h1>
                <Link to="/the-hat-game" onClick={props.updateSelectedGame}><img className="lets-go-img" src={letsGo} /></Link>
            </div> :
            <div>
                <h1>Add Your Clues to the Hat</h1>
                <h3>
                    { numberOfPlayersToAddClues ? numberOfPlayersToAddClues + " more players need to add their clues to the hat." : null}
                </h3>
                <Link to='/add-clues-home'><button className=" add-clues-btn yellow-btn">Start Adding Clues</button></Link>
            </div>     
        }
            
       
    </>
    )
}

