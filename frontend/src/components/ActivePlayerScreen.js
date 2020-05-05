import React, {useState, useEffect} from 'react'
import { Redirect } from 'react-router-dom'
import '../App.css'

const ActivePlayerScreen = (props) => {
    
    // Timer
    const [timerStarted, setTimerStarted] = useState(false)
    const [clock, setClock] = useState(null)
    const [timeLeft, setTimeLeft] = useState(4);
    // Clues
    const [cluesArray, setCluesArray] = useState(props.selectedGame.clues)
    const [currentClue, setCurrentClue] = useState()
    const [counter, setCounter] = useState(0)
    const [emptyHatRedirect, setEmptyHatRedirect] = useState(false)
    
    function startRound() {
        setTimerStarted(true)
        nextClue()
        props.getTeamsCurrentScore()
    }

    function nextClue(){
        if(currentClue){ 
          props.onClueGuessed(currentClue.id)
        }
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
            props.endTurnSetDbScore()
            setEmptyHatRedirect(true)
            return reject    
        } else {
            setCurrentClue(cluesArray[counter])
        }
     })
    }
  
    useEffect(() => {
        if (!timerStarted) return
        console.log("useEffect ran");

        const intervalId = setInterval(() => {
          console.log("timer ticks");
          setTimeLeft(prevTimeLeft => {
            if (prevTimeLeft === 1) {
              clearInterval(intervalId)
              return <Redirect to='/the-hat-game/turn-over'/>
            } else {
              return prevTimeLeft - 1
            }
          })
        }, 1000);

        // clear interval on re-render to avoid memory leaks
        return () => {
            console.log("interval was cleared");  
            clearInterval(intervalId);
          }
        }, [timerStarted])

       

    return (
        <>
            { timerStarted ? null : <h1>Have you picked up the hat?</h1> }
            { timerStarted ? null : <button className="start-clock" onClick={startRound}>Start the Clock</button> }
            { timerStarted ? <div className="time-left"> {timeLeft} </div> : null}
            { timerStarted && currentClue? <div>Current Clues: <br/><span className="current-clue">{currentClue.content}</span></div> : null }
            { timerStarted ? <button onClick={nextClue}>Next Clue</button> : null }  
            { emptyHatRedirect ? <Redirect to='/the-hat-is-empty'/> : null } 
        </>
    )
}
export default ActivePlayerScreen