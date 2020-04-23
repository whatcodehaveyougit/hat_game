import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import {BrowserRouter as Router, Route, Redirect, Switch } from "react-router-dom"
import Game from '../components/Game'
import CreateGame from '../components/CreateGame.js'
import CreateTeams from '../components/CreateTeams.js'
import HomePage from '../components/HomePage.js'

function Dashboard() {
    
    // Keeping local state in a functional component!
    // Games is the state item ----- setGames is the function that alters the state
    // useState([]) sets games as an empty array 
    const [games, setGames] = useState([])
    const [createdGame, setCreatedGame] = useState()

    // This is basically ComponentDidMount due to the empty array, only gets rendered once
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

    function onPlayerPost(newPlayerName, teamName){
      fetch("/players/", {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: newPlayerName,
          team: teamName,
          game: `games/${createdGame._links.self.href}`
        })
      })
      
    }

 
        return (
          <>
          <Navbar />
            <Router>
                    
                    <Route exact path="/" render={() => <HomePage games={games}   /> } />

                    {/* <Switch>
                      <Route path='/create-game' component={CreateGame} />
                    </Switch> */}

                    {/* <Switch>
                      <Route path = "/game/:gameTitle" component={Game} />}/>
                    </Switch> */}

                    <Route exact path="/create-game" render={() => <CreateGame onGamePost={onGamePost} /> } />
                   
                    {/* I have put in this ternary as before it was trying to load the component before the state had been set to pass down */}
                    { createdGame ? <Route exact path="/create-teams" render={() => <CreateTeams createdGame={createdGame} onPlayerPost={onPlayerPost} /> } /> : null }
            </Router>
            </>
        )

    
}

export default Dashboard