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
      <h3>Players</h3>
    { props.playersInCreatedGame.map((player) => (
        <div class="player-name-to-add-clues">
           <div className="players" onClick={handleRedirect}>{player.name}</div>            
        </div>
    ))}

    </>
    )
}