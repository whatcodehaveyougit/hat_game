import React, {useState, useEffect} from 'react'
import { Redirect } from 'react-router-dom'
import '../App.css'

const ActivePlayerScreen = (props) => {
    
    const [displayButton, setDisplayButton] = useState(props.displayButton)
    const [seconds, setSeconds] = useState(60);
    const [redirect, setRedirect] = useState(props.redirect)
    const [cluesArray, setCluesArray] = useState(props.selectedGame.clues)
    const [currentClue, setCurrentClue] = useState()
    const [counter, setCounter] = useState(0)
    const [emptyHatRedirect, setEmptyHatRedirect] = useState(false)

    if (emptyHatRedirect){
        return <Redirect to='/the-hat-is-empty'/>
        }

    if(redirect) {
        return <Redirect to='/the-hat-game/turn-over' />
    }    
    
    function startRound() {
        setDisplayButton(false)
        startTimer(5)
        nextClue()
    }

    function nextClue(){
        incrementCounter()
        .then(isHatEmpty())
    }

    function incrementCounter(){
     return new Promise((resolve, reject) => {
        setCounter(counter + 1)
     })
    } 

    function isHatEmpty(){
        return new Promise((resolve, reject) => {     
        if (cluesArray.length === counter){
            setEmptyHatRedirect(true) 
            return reject      
        } else {
            setCurrentClue(cluesArray[counter].content)
        }
     })
    }
  
    function startTimer(seconds) {
        let clock = setInterval(function () {
            seconds = seconds - 1    
            setSeconds(seconds);
        
            if (seconds === 0) {
                clearTimeout(clock)
                return setRedirect(true)
            }
        }, 1000);
    }

    return (
        <>
            { displayButton ? <h1>Have you picked up the hat?</h1> : null }
            { displayButton ? <button className="start-clock" onClick={startRound}>Start the Clock</button> : null }
            { displayButton ? null : <div className="time-left"> {seconds} </div> }
            { displayButton ? null : <div>Current Clues: <br/><span className="current-clue">{currentClue}</span></div> }
            { displayButton ? null : <button onClick={nextClue}>Next Clue</button> }
        </>
    )
}
export default ActivePlayerScreen