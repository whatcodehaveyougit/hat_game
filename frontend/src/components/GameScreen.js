import React, { useEffect} from 'react'
import {Link, Redirect } from 'react-router-dom'
import hat from '../assets/hat.png'
import '../App.css'


export default function GameScreen(props) {

useEffect(() => {
    console.log('use effect ran');
    props.updateSelectedGame()
}, [])


if(props.selectedGame){
    if (props.selectedGame.round > 3){
        return <Redirect to='/game-over'/>
    }
  } 
 

    return (
        <>
            <div className="custom-grid">
                <div></div>
                <h1>Round { props.selectedGame.round }</h1>
                { props ? <h1><span className="highlight"> { props.orderedTeams[props.selectedGame.activeTeam].name } </span> to go</h1> : null }
            </div>
            
            
            <div className="custom-grid">
                <div></div>
                <div className="scores-wrapper">
                    <h3>Scores</h3>
                    { props ? props.orderedTeams.map((team, index) => (
                            <div className="team-on-table no-break" key={index}> {team.name} : {team.score} </div>
                    )) : null }
                </div>

                <div className="game-screen-btn-wrapper">
                    <button className="big-btn game-scren-fetch on-hover-underline yellow-btn" onClick={props.updateSelectedGame}>Update Game Info</button>
                </div>

                
             </div>
            <h2>Choose a player from your team and...</h2> 
            <h3>Grab the hat amigo!</h3>
            <Link to="/the-hat-game/player-with-hat"><img className="animation hat-on-game-screen" src={hat} /></Link>

        </>
    )
}