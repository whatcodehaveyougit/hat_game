import React, { useState, useEffect } from 'react'
import CreateGame from '../components/CreateGame.js'

function Dashboard() {
    
    // Games is the state item
    // setGames is the function that alters the state
    // useState([]) tells it to expect an array 
    const [games, setGames] = useState([])

    // This is basically ComponentDidMount due to the empty array, only gets rendered once
    useEffect(() => {
        fetch("/games/")
        .then(res => res.json())
        .then(resTwo => resTwo._embedded.games)
        .then(games => setGames( games ))
        .catch(err => console.error);
    }, [])

 
        return (
            <>
                <h1>The Hat Game</h1>
                <h3>These are the games today</h3>
                { games.map ( game => (
                    <button class="game">{game.title}</button>
                ))}
                <CreateGame />
               
            </>
        )
    
}

export default Dashboard