import React, { useState, useEffect } from 'react'

export default function GameOver(props){
const [winner, setWinner] = useState()

useEffect(() => {
calculateWinner(props.orderedTeams)
},[])

function calculateWinner(teams){
    let winningTeam = {score: 0}
    teams.forEach(team => {
        if (team.score > winningTeam.score) {
            winningTeam = team
        }
    })
    setWinner(winningTeam)
    console.log(winningTeam + "are winners");
}

   return ( 
   <>
   <section className="game-over">
        { winner ? <> <h1 className="winners">{winner.name} are the winners!</h1> </> : null }
       
        <div>
            <div className="final-score-wrapper">
                <h3>Final Scores</h3>
                    { props ? props.orderedTeams.map((team, index) => (
                            <div key={index}> {team.name} : {team.score} </div>
                    )) : null }
            </div>
        </div>
        <button onClick={() => props.onGameDelete(props.selectedGame.id)}>When finished, please click here to delete game</button>
    </section>
    </>
   )
}