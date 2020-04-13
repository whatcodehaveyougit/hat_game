import React, { useState, useEffect } from 'react'

function Dashboard() {
    
    const [games, setGames] = useState([])

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
               
            </>
        )
    
}

export default Dashboard