import React, {useState} from 'react'
import { Redirect } from 'react-router-dom'

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
        <div>
           <div className="players" onClick={handleRedirect}>{player.name}</div>            
        </div>
    ))}
    </>
    )
}