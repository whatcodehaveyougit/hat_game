import React, {useState} from 'react'

export default function GameScreen(props) {
    const [game, setGame] = useState(props.selectedGame)    

    return (
        <>
        <p>Sigurd's turn to go next</p>
        <button>Grab the Hat</button>

        <h3>Dynamic Scores</h3>
        { game ? game.teams.map((team, index) => (
                <div key={index}> {team.name} : {team.score} </div>
        )) : null  }

        </>
    )
}