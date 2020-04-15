import React, { useState, useEffect } from 'react'
import Navbar from '../components/Navbar'
import {BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import CreateGame from '../components/CreateGame.js'
import HomePage from '../components/HomePage.js'

function Dashboard() {
    
    // Keeping local state in a functional component!
    // Games is the state item ----- setGames is the function that alters the state
    // useState([]) sets games as an empty array 
    const [games, setGames] = useState([])

    // This is basically ComponentDidMount due to the empty array, only gets rendered once
    useEffect(() => {
        fetch("/games/")
        .then(res => res.json())
        .then(resTwo => resTwo._embedded.games)
        .then(games => setGames( games ))
        .catch(err => console.error);
    }, [])

    handleContestSubmit(){
        console.log("contest submit")
    }

 
        return (
            <Router>
                <React.Fragment>
                    
                    <Navbar />
                    <Route exact path="/" render={() => <HomePage games={games} /> } />
                    <Route exact path="/create-game" render={() => <CreateGame /> } />
               
                </React.Fragment>
      </Router>
        )

    
}

export default Dashboard