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
import GameOver from '../components/GameOver.js'
import { getNodeText } from '@testing-library/react'

export default function Dashboard() {
    
    const [games, setGames] = useState([])
    const [createdGame, setCreatedGame] = useState()
    const [createdTeam, setCreatedTeam] = useState()
    const [playersInCreatedGame, setPlayersInCreatedGame] = useState([])
    const [selectedGame, setSelectedGame] = useState({})
    const [currentRound, setCurrentRound] = useState()
    const [selectedTeam, setSelectedTeam] = useState()
    const [selectedTeamCounter, setSelectedTeamCounter] = useState(1)
    const [redirect, setRedirect] = useState(false)
    const [displayButton, setDisplayButton] = useState(true)
    const [currentScore, setCurrentScore] = useState()
    const [gameOver, setGameOver] = useState(false)

    useEffect(() => {
        fetch("/games/")
        .then(res => res.json())
        .then(resTwo => resTwo._embedded.games)
        .then(games => setGames( games ))
        .catch(err => console.error);
    }, [])

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

    // Setup for round 

    function getTeamsCurrentScore(){
      fetch(`/teams/${selectedTeamCounter}`)
      .then(res => res.json())
      .then(resTwo => setCurrentScore(resTwo.score))
      .then(res => console.log(currentScore + ": current score set"));
    }

    // Start of Turn / Round

      function startRoundWithTeamOne(){
        setSelectedTeam(selectedGame.teams[0])
        setCurrentRound(selectedGame.round)
        console.log(selectedGame.round + " is the round");
        
      }

      // During Turn

      function onClueGuessed(){
        console.log("clue guessed!" + currentScore);        
        setCurrentScore(currentScore + 1)
      }

      // End of Turn 


      function endTurnSetDbScore(){  
        fetch(`/teams/${selectedTeam.id}`, {
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

      function changeAndSetSelectedTeam(){
        endTurnSetDbScore()
        if (selectedTeamCounter === selectedGame.teams.length){
          setSelectedTeam(selectedGame.teams[0])
          setSelectedTeamCounter(1)
        } else {
          setSelectedTeam(selectedGame.teams[selectedTeamCounter])
          setSelectedTeamCounter(selectedTeamCounter + 1)
        }
      }

      function endOfRound(){          
        const nextRound = currentRound + 1
        fetch(`/games/${selectedGame.id}`, {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            round: nextRound
          }) 
      })
      setCurrentRound(nextRound)
      if (currentRound > 10){
        setGameOver(true)
      }
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

                    { selectedGame ? <Route exact path="/game-home" render={() => <ReadyToPlay selectedGame={selectedGame}  startRoundWithTeamOne={startRoundWithTeamOne} selectedTeam={selectedTeam} /> } /> : null }
                    { selectedGame  && selectedTeam? <Route exact path="/the-hat-game" render={() => <GameScreen selectedGame={selectedGame} selectedTeam={selectedTeam} currentRound={currentRound} gameOver={gameOver} /> } /> : null } 
                    <Route exact path="/the-hat-game/player-with-hat" render={() => <ActivePlayerScreen selectedGame={selectedGame} redirect={redirect} displayButton={displayButton} onClueGuessed={onClueGuessed} getTeamsCurrentScore={getTeamsCurrentScore} endTurnSetDbScore={endTurnSetDbScore} /> } />
                    <Route exact path="/test-clock" render={() => <ClockTest selectedGame={selectedGame} redirect={redirect} displayButton={displayButton} /> } />

                    <Route exact path="/the-hat-game/turn-over" render={() => <TurnOverScreen setRedirect={setRedirect} setDisplayButton={setDisplayButton} changeAndSetSelectedTeam={changeAndSetSelectedTeam} /> } />
                    <Route exact path="/the-hat-is-empty" render={() => <EmptyHat endOfRound={endOfRound} /> } />
                    <Route exact path="/game-over" render={() => <GameOver /> } />
            </Router>

            </>
        )
}
