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
import ActivePlayerScreen from '../components/ActivePlayerScreen.js'
import TurnOverScreen from '../components/TurnOverScreen.js'
import RoundOver from '../components/RoundOver.js'
import GameOver from '../components/GameOver.js'
import AddCluesHome from '../components/GameSetup/AddCluesHome.js'

export default function Dashboard() {
    
    const [games, setGames] = useState([])
    const [createdGame, setCreatedGame] = useState()
    const [createdTeam, setCreatedTeam] = useState()
    const [playersInCreatedGame, setPlayersInCreatedGame] = useState([])
    const [selectedGame, setSelectedGame] = useState({})
    const [selectedGamePlayers, setSelectedGamePlayers] = useState([])
    const [playerAddingClues, setPlayerAddingClues] = useState({})
    const [orderedTeams, setOrderedTeams] = useState([]);
    const [currentScore, setCurrentScore] = useState()
    const [gameOver, setGameOver] = useState(false)
    const [emptyHatRedirect, setEmptyHatRedirect] = useState(false)

    useEffect(() => {
     fetchGames()
    }, [])

    function fetchGames(){
      fetch("/games/")
      .then(res => res.json())
      .then(resTwo => resTwo._embedded.games)
      .then(games => setGames( games ))
      .catch(err => console.error);
    }

    // Shuold not have to do this - the data structures are not consistant - annoying!
    const updateSelectedGame = (e) => {  
      fetch(`/games/`)
      .then(res => res.json())
      .then((resTwo) => {
          resTwo._embedded.games.forEach(game => { 
          if (game.id == selectedGame.id){
          setSelectedGame(game)
          }
        })
      })
    }
    
    useEffect(() => {
      if(selectedGame.teams){
        const orderedTeams = selectedGame.teams.sort((a, b) => (a.id > b.id) ? 1 : -1);
        setOrderedTeams(orderedTeams)
      }
    }, [selectedGame])

    async function asyncSetSelectedGame(game){
      return new Promise((resolve, reject) => {     
        setSelectedGame(game)
        resolve(game)        
      })
    }

    async function getPlayers(game){
        const array = []
        await fetch(`/games/${game.id}/teams`)
        .then(res => res.json())
        .then(resTwo => resTwo._embedded.teams.forEach(team => {
          team.players.forEach(player => {
            array.push(player)
          })
        }))
        .then(players => setSelectedGamePlayers(array))
        .then(console.log(selectedGamePlayers))
        .catch(err => console.error)
      }

    function finishedAddingClues(){
      fetch(`/players/${playerAddingClues.id}`, {
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          addedClues: true
        })
      })
    }
  

    function onGamePost(newGame){
        fetch("/games/", {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              title: newGame,
              round: 1
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
          team: `teams/${createdTeam._links.self.href}`,
          addedClues: false
        })
      })
      .then(res => res.json())
      .then(player => addPlayerToState(player));
    }

    function addPlayerToState(player){
      console.log("function runs" + playersInCreatedGame)
      let array = playersInCreatedGame
      array.push(player)
      setPlayersInCreatedGame(array)
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
            game: `games/${selectedGame._links.self.href}`,
            guessed: false
          })
        })
      }

    // Setup for round 

    function getTeamsCurrentScore(){
      console.log('Get teams current score called');
      fetch(`/teams/${selectedGame.teams[selectedGame.activeTeam].id}`)
      .then(res => res.json())
      .then(team => setCurrentScore(team.score))
      .then(res => console.log(res))
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

      async function endOfTurn(){
        await fetch(`/teams/${selectedGame.teams[selectedGame.activeTeam].id}`, {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            score: currentScore
          }) 
        })
          if (selectedGame.activeTeam + 1 === selectedGame.teams.length){
              return fetch(`/games/${selectedGame.id}`, {
                method: 'PATCH',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  activeTeam: 0
                }) 
            })
          } else { 
           let newTeam = selectedGame.activeTeam + 1           
              return fetch(`/games/${selectedGame.id}`, {
                method: 'PATCH',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  activeTeam: newTeam
                }) 
            })
      } 
    }

      async function endOfRound(){   
        const nextRound = selectedGame.round + 1
        await fetch(`/games/${selectedGame.id}`, {
          method: 'PATCH',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            round: nextRound
          }) 
      })
      await selectedGame.clues.forEach(clue => {
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

        return (
          <>
          <Navbar />
            <Router>
                    
                    <Route exact path="/" render={() => <HomePage games={games} fetchGames={fetchGames} asyncSetSelectedGame={asyncSetSelectedGame} getPlayers={getPlayers}   /> } />
        
                    <Route exact path="/create-game" render={() => <CreateGame onGamePost={onGamePost} /> } />
                     {/* I have put in this ternary as before it was trying to load the component before the state had been set to pass down  */}
                    { createdGame ? <Route exact path="/create-teams" render={() => <CreateTeams createdGame={createdGame} onPlayerPost={onPlayerPost} onTeamPost={onTeamPost} /> } /> : null }
                    <Route exact path="/add-clues" render={() => <AddClues createdGame={createdGame} playersInCreatedGame={playersInCreatedGame} /> } /> 
                    <Route exact path="/add-clues/player" render={() => <AddCluesPlayer onCluePost={onCluePost} finishedAddingClues={finishedAddingClues} /> } />
                    <Route exact path="/add-clues-home" render={() => <AddCluesHome selectedGamePlayers={selectedGamePlayers} setPlayerAddingClues={setPlayerAddingClues} /> } />

                    { selectedGame ? <Route exact path="/ready-to-play" render={() => <ReadyToPlay selectedGame={selectedGame} selectedGamePlayers={selectedGamePlayers} updateSelectedGame={updateSelectedGame} /> } /> : null }
                    { orderedTeams ? <Route exact path="/the-hat-game" render={() => <GameScreen selectedGame={selectedGame} updateSelectedGame={updateSelectedGame} gameOver={gameOver} orderedTeams={orderedTeams} /> } /> : null } 
                    <Route exact path="/the-hat-game/player-with-hat" render={() => 
                    <ActivePlayerScreen selectedGame={selectedGame} onClueGuessed={onClueGuessed} getTeamsCurrentScore={getTeamsCurrentScore} endOfTurn={endOfTurn}
                     emptyHatRedirect={emptyHatRedirect} /> } />

                    <Route exact path="/the-hat-game/turn-over" render={() => <TurnOverScreen endOfTurn={endOfTurn} emptyHatRedirect={emptyHatRedirect} /> } />
                    <Route exact path="/the-hat-is-empty" render={() => <RoundOver endOfRound={endOfRound} endOfTurn={endOfTurn} /> } />
                    <Route exact path="/game-over" render={() => <GameOver orderedTeams={orderedTeams}  /> } />
            </Router>
            </>
        )
}
