import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'
import '../App.css'

export default function Games(props) {  
const [redirect, setRedirect] = useState(false)

function handleRedirect(game){
  props.setSelectedGame(game);
  setRedirect(true)
}

// On Click it takes it the page where everyone clicks to say they are ready - aka ready to play
if(redirect) {
  return <Redirect to='/ready-to-play'/>
}

  return (
      <>
      <h3>Games In Progress</h3>
    { props.games.map((game, index) => (
       <div key={index} onClick={() => handleRedirect(game)} className="box">{game.title}</div>
    ))}
    </>
  )
};