import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'
import '../App.css'

export default function Games(props) {  
const [redirect, setRedirect] = useState(false)

function handleRedirect(game){
  props.setSelectedGame(game)
  setRedirect(true)
}

if(redirect) {
  return <Redirect to='/game-home'/>
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