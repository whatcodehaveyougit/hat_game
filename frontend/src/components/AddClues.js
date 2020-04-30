import React, {useState} from 'react'
import { Redirect } from 'react-router-dom'
import '../App.css'

export default function AddClues(props){
const [redirect, setRedirect] = useState(false)

function handleRedirect(){
    setRedirect(true)
}

if(redirect) {
    return <Redirect to='/add-clues/player' />
}
    return(
        <>
      <h3>Time to Add Clues to the Hat</h3>
      <div className="players-adding-clues-container">
    { props.playersInCreatedGame.map((player) => (
        <div class="player-name-to-add-clues">
           <div className="player" onClick={handleRedirect}>{player.name} <br/> is ready to start adding clues!</div>            
        </div>
    ))}
    </div>
    </>
    )
}