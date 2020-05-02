import React, { useState, useEffect } from 'react'
import Navbar from './Navbar'
import {BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom"
import ReadyToPlay from '../components/ReadyToPlay.js'
import AddClues from '../components/GameSetup/AddClues.js'
import AddCluesPlayer from '../components/GameSetup/AddCluesPlayer.js'
import CreateGame from '../components/GameSetup/CreateGame.js'
import GameScreen from '../components/GameScreen.js'
import CreateTeams from '../components/GameSetup/CreateTeams.js'
import HomePage from '../components/HomePage.js'
import ClockTest from '../components/ClockTest.js'
import ActivePlayerScreen from '../components/ActivePlayerScreen.js'
import TurnOverScreen from '../components/TurnOverScreen.js'
import EmptyHat from '../components/EmptyHat.js'
import { getNodeText } from '@testing-library/react'

export default function Dashboard() {
    
    const [games, setGames] = useState([])
    const [createdGame, setCreatedGame] = useState()
    const [createdTeam, setCreatedTeam] = useState()
    const [playersInCreatedGame, setPlayersInCreatedGame] = useState([])
    const [selectedGame, setSelectedGame] = useState({})
    const [selectedTeam, setSelectedTeam] = useState()
    const [selectedTeamCounter, setSelectedTeamCounter] = useState(0)
    const [redirect, setRedirect] = useState(false)
    const [displayButton, setDisplayButton] = useState(true)
    const [currentScore, setCurrentScore] = useState()

    useEffect(() => {
        fetch("/games/")
        .then(res => res.json())
        .then(resTwo => resTwo._embedded.games)
        .then(games => setGames( games ))
        .catch(err => console.error);
    }, [])

    function test(player) {
      setPlayersInCreatedGame(playersInCreatedGame => [...playersInCreatedGame, player])
    }

    function onGamePost(newGame){
        fetch("/games/", {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: newGame
            })
          })
          .then(res => res.json())
          .then(game => setCreatedGame(game));
    }

    function onTeamPost(newTeamName){
      fetch("/teams/",{
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newTeamName,
          game: `games/${createdGame._links.self.href}` 
        })
      })
      .then(res => res.json())
      .then(team => setCreatedTeam(team));
    }

    function onPlayerPost(newPlayerName, teamName){
      fetch("/players/", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newPlayerName,
          team: `teams/${createdTeam._links.self.href}`
        })
      })
      .then(res => res.json())
      .then(player => test(player));
    }

      function onCluePost(newClue){
        fetch("/clues/", {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            content: newClue,
            game: `games/${createdGame._links.self.href}`
          })
        })
      }

      function endTurnSetScoreInDb(){  
        fetch("/teams/2", {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            score: currentScore
          }) 
      })
    }
      function onClueGuessed(){
        console.log("clue guessed!" + currentScore);        
        setCurrentScore(currentScore + 1)
      }


      function changeSelectedTeam(){
        endTurnSetScoreInDb()
        if (selectedTeamCounter === selectedGame.teams.length){
          console.log("back to zero");
          setSelectedTeam(selectedGame.teams[0])
          setSelectedTeamCounter(1)
        } else {
          setSelectedTeam(selectedGame.teams[selectedTeamCounter])
          setSelectedTeamCounter(selectedTeamCounter + 1)
        }
      }
 
      function getTeamsCurrentScore(){
        fetch("/teams/2")
        .then(res => res.json())
        .then(resTwo => setCurrentScore(resTwo.score))
        .then(res => console.log(currentScore + ": current score set"));
      }

        return (
          <>
          <Navbar />
            <Router>
                    
                    <Route exact path="/" render={() => <HomePage games={games} setSelectedGame={setSelectedGame}   /> } />
        
                    <Route exact path="/create-game" render={() => <CreateGame onGamePost={onGamePost} /> } />
                     {/* I have put in this ternary as before it was trying to load the component before the state had been set to pass down  */}
                    { createdGame ? <Route exact path="/create-teams" render={() => <CreateTeams createdGame={createdGame} onPlayerPost={onPlayerPost} onTeamPost={onTeamPost} /> } /> : null }
                    <Route exact path="/add-clues" render={() => <AddClues createdGame={createdGame} playersInCreatedGame={playersInCreatedGame} /> } /> 
                    <Route exact path="/add-clues/player" render={() => <AddCluesPlayer onCluePost={onCluePost} /> } />

                    { selectedGame ? <Route exact path="/game-home" render={() => <ReadyToPlay game={selectedGame}  changeSelectedTeam={changeSelectedTeam}  selectedTeam={selectedTeam} /> } /> : null }
                    { selectedGame ? <Route exact path="/the-hat-game" render={() => <GameScreen selectedGame={selectedGame} selectedTeam={selectedTeam} /> } /> : null } 
                    <Route exact path="/the-hat-game/player-with-hat" render={() => <ActivePlayerScreen selectedGame={selectedGame} redirect={redirect} displayButton={displayButton} onClueGuessed={onClueGuessed} getTeamsCurrentScore={getTeamsCurrentScore} endTurnSetScoreInDb={endTurnSetScoreInDb} /> } />
                    <Route exact path="/test-clock" render={() => <ClockTest selectedGame={selectedGame} redirect={redirect} displayButton={displayButton} /> } />

                    <Route exact path="/the-hat-game/turn-over" render={() => <TurnOverScreen setRedirect={setRedirect} setDisplayButton={setDisplayButton} changeSelectedTeam={changeSelectedTeam} /> } />
                    <Route exact path="/the-hat-is-empty" render={() => <EmptyHat /> } />

            </Router>

            </>
        )
}
