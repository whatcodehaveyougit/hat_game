import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'
import '../App.css'

export default function Games(props) {  
const [redirect, setRedirect] = useState(false)

async function handleRedirect(game){
  await props.asyncSetSelectedGame(game);
  await props.getPlayers(game)
  setRedirect(true)
}

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