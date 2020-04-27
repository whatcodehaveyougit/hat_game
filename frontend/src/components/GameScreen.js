import React, {useState} from 'react'

export default function GameScreen(props) {
    const [game, setGame] = useState(props.selectedGame)
    console.log(game);
    

    return (
        <>
        <p>Sigurd's turn to go next</p>
        <button>Grab the Hat</button>

        <h3>Dynamic Scores</h3>
        <div>Team1: 10</div>
        <div>Team2: 10</div>

        </>
    )
}