import React, { useState } from 'react';
import '../App.css'

export default function Games(props) {
  const [games, setGames] = useState(props);
  
  return (
      <>
      <h3>Your Previous Games</h3>
    { props.games.map(games => (
        <div class="game">{games.title}</div>
    ))}
    </>
  )
};