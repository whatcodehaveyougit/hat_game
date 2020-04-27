import React, { useState } from 'react';
import { Redirect } from 'react-router-dom'
import '../App.css'

export default function Games(props) {  
const [redirect, setRedirect] = useState(false)

function handleRedirect(){
    setRedirect(true)
}

if(redirect) {
    return <Redirect to='/game-home' />
}

  return (
      <>
      <h3>Your Previous Games</h3>
    { props.games.map((game, index) => (
       <div key={index} onClick={handleRedirect} className="game">{game.title}</div>
    ))}
    </>
  )
};