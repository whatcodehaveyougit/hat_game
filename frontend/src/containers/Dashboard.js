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
    const [orderedTeams, setOrderedTeams] = useState([]);
    // const [selectedGameClues, setSelectedGameClues] = useState(selectedGame.clues)
    const [currentRound, setCurrentRound] = useState()
    const [selectedTeam, setSelectedTeam] = useState()
    const [selectedTeamCounter, setSelectedTeamCounter] = useState(0)
    const [displayButton, setDisplayButton] = useState(true)
    const [currentScore, setCurrentScore] = useState()
    const [gameOver, setGameOver] = useState(false)
    const [emptyHatRedirect, setEmptyHatRedirect] = useState(false)

    useEffect(() => {
        fetch("/games/")
        .then(res => res.json())
        .then(resTwo => resTwo._embedded.games)
        .then(games => setGames( games ))
        .catch(err => console.error);
    }, [])

    // Not a solution - picks the first game out of the array
    const updateSelectedGame = (e) => {  
      fetch(`/games/`)
      .then(res => res.json())
      .then(resTwo => resTwo._embedded.games[0])
      .then(game => setSelectedGame( game ))
      .catch(err => console.error);
    }

    useEffect(() => {
      if(selectedGame.teams){
        const orderedTeams = selectedGame.teams.sort((a, b) => (a.id > b.id) ? 1 : -1);
        setOrderedTeams(orderedTeams)
      }
    }, [selectedGame])
  

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

    function onPlayerPost(newPlayerName){  
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
      // .then(player => test(player));
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
      fetch(`/teams/${selectedGame.teams[selectedGame.activeTeam].id}`)
      .then(res => res.json())
      .then(team => setCurrentScore(team.score))
    }

      // During Turn
      function onClueGuessed(clueId){        
          fetch(`/clues/${clueId}`, {
            method: 'PATCH',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              guessed: true
            }) 
        })
        setCurrentScore(currentScore + 1)
      }

      // End of Turn 

      function endTurnSetDbScore(){ 
        console.log("end of turn db tunning - DB") 
        fetch(`/teams/${selectedGame.teams[selectedGame.activeTeam].id}`, {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            score: currentScore
          }) 
      }).then (() =>  setCurrentScore(0))
    }

      function endOfTurn(){
        console.log("end of turn running dashboard");
        endTurnSetDbScore()
          if (selectedGame.activeTeam + 1 === selectedGame.teams.length){
              fetch(`/games/${selectedGame.id}`, {
                method: 'PATCH',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  activeTeam: 0
                }) 
            })
            console.log("active team set to zero")    
          } else { 
           let newTeam = selectedGame.activeTeam + 1           
              fetch(`/games/${selectedGame.id}`, {
                method: 'PATCH',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  activeTeam: newTeam
                }) 
            })
            console.log(selectedGame.activeTeam + "selectedGame active Team");         
      } 
    }

      function endOfRound(){   
        setEmptyHatRedirect(false)       
        const nextRound = selectedGame.round + 1
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
        selectedGame.clues.forEach(clue => {
          fetch(`/clues/${clue.id}`, {
            method: 'PATCH',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              guessed: false
            }) 
        })    
      })
    }

    function hatIsEmpty(){
      console.log("hat is empty");
      setEmptyHatRedirect(true);
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

                    { selectedGame ? <Route exact path="/ready-to-play" render={() => <ReadyToPlay selectedGame={selectedGame} /> } /> : null }
                    { orderedTeams ? <Route exact path="/the-hat-game" render={() => <GameScreen selectedGame={selectedGame} updateSelectedGame={updateSelectedGame} gameOver={gameOver} orderedTeams={orderedTeams} emptyHatRedirect={emptyHatRedirect} /> } /> : null } 
                    <Route exact path="/the-hat-game/player-with-hat" render={() => 
                    <ActivePlayerScreen selectedGame={selectedGame} displayButton={displayButton} onClueGuessed={onClueGuessed} getTeamsCurrentScore={getTeamsCurrentScore} endOfTurn={endOfTurn}
                    hatIsEmpty={hatIsEmpty} emptyHatRedirect={emptyHatRedirect} /> } />

                    <Route exact path="/the-hat-game/turn-over" render={() => <TurnOverScreen setDisplayButton={setDisplayButton} endOfTurn={endOfTurn} emptyHatRedirect={emptyHatRedirect} /> } />
                    <Route exact path="/the-hat-is-empty" render={() => <EmptyHat endOfRound={endOfRound} setDisplayButton={setDisplayButton} endOfTurn={endOfTurn} /> } />
                    <Route exact path="/game-over" render={() => <GameOver orderedTeams={orderedTeams}  /> } />
            </Router>
            </>
        )
}
