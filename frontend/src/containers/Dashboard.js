import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import {BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom"
import GameHome from '../components/GameHome.js'
import AddClues from '../components/AddClues.js'
import AddCluesPlayer from '../components/AddCluesPlayer.js'
import CreateGame from '../components/CreateGame.js'
import GameScreen from '../components/GameScreen.js'
import CreateTeams from '../components/CreateTeams.js'
import HomePage from '../components/HomePage.js'
import Test from '../components/Test.js'

export default function Dashboard() {
    
    const [games, setGames] = useState([])
    const [createdGame, setCreatedGame] = useState()
    const [createdTeam, setCreatedTeam] = useState()
    const [playersInCreatedGame, setPlayersInCreatedGame] = useState([])
    const [selectedGame, setSelectedGame] = useState({})


    // Aka ComponentDidMount
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

        return (
          <>
          <Navbar />
            <Router>
                    
                    <Route exact path="/" render={() => <HomePage games={games} setSelectedGame={setSelectedGame}   /> } />
        
                    <Route exact path="/create-game" render={() => <CreateGame onGamePost={onGamePost} /> } />
                     {/* I have put in this ternary as before it was trying to load the component before the state had been set to pass down  */}
                    { createdGame ? <Route exact path="/create-teams" render={() => <CreateTeams createdGame={createdGame} onPlayerPost={onPlayerPost} onTeamPost={onTeamPost} /> } /> : null }
                    <Router exact path="/test" render={() => <Test /> } />
                    <Route exact path="/add-clues" render={() => <AddClues createdGame={createdGame} playersInCreatedGame={playersInCreatedGame} /> } /> 
                    <Route exact path="/add-clues/player" render={() => <AddCluesPlayer onCluePost={onCluePost} /> } />

                    { selectedGame ? <Route exact path="/game-home" render={() => <GameHome game={selectedGame} /> } /> : null }
        { selectedGame ? <Route exact path="/my-hat-game" render={() => <GameScreen selectedGame={selectedGame} /> } /> : null } 

                    
            </Router>

            </>
        )
}
