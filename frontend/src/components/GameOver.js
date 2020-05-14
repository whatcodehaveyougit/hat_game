import React from 'react'

export default function GameOver(props){
   return ( 
   <>
    <h1>Game Over Dudes!</h1>
    <h3>Final Scores</h3>
        { props ? props.orderedTeams.map((team, index) => (
                <div key={index}> {team.name} : {team.score} </div>
        )) : null }
    </>
   )
}