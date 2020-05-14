import React, {useState, useEffect} from 'react'
import { Redirect } from 'react-router-dom'
import '../App.css'

const ActivePlayerScreen = (props) => {
    
    // Timer
    const [timerStarted, setTimerStarted] = useState(false)
    const [timeLeft, setTimeLeft] = useState(4);
    // Clues
    const [cluesArray, setCluesArray] = useState(props.selectedGame.clues)
    const [cluesInHat, setCluesInHat] = useState([])
    const [currentClue, setCurrentClue] = useState()
    const [turnCount, setTurnCount] = useState(0)
    const [clueCount, setClueCount] = useState(0)
   
    useEffect(() => { 
      if(cluesArray){
        filterOutGuessedClues(cluesArray)
        .then(res => isHatEmpty(res))
        .then(res => shuffle(res)) 
    }
  }, [turnCount]);
// This turn count should not be necessary - it is to stop it going on an infinite loop

    function filterOutGuessedClues(arrayOfClues){      
      return new Promise(resolve => {
        let array = []; 
          arrayOfClues.forEach(clue => {
              if(clue.guessed === false){
              array.push(clue)
              }
            })
            console.log("1. Unguessed clues: fromn filter " + array)
            resolve(array)
          })  
        }

    function isHatEmpty(clues){
      return new Promise((resolve, reject) => {     
      if (clues.length === 0){
          console.log("hat is empty activated");     
          setTimeLeft(0)
          props.endOfTurn()
          props.setEmptyHatRedirect(true)          
          return(reject)    
      } else {
        resolve(clues)
      }
    })
  }

    function shuffle(array) { 
      let counter = array.length;
      while (counter > 0) {
          let index = Math.floor(Math.random() * counter);
            counter--;

          let temp = array[counter];
          array[counter] = array[index];
          array[index] = temp;
      }
      console.log("Shuffle Cloues, 2, cloues are " + array);
      setCluesInHat(array)
  }
    
    function startTurn() {
        setTimerStarted(true)
        setCurrentClue(cluesInHat[clueCount]) 
        incrementCounter()
        props.getTeamsCurrentScore()
    }
    
    function setClueGuessedToTrue(){
      return new Promise((resolve, reject) => {
        resolve(
        currentClue.guessed = true
        )
      })
    }

    function nextClue(){
          props.onClueGuessed(currentClue.id)
          setClueGuessedToTrue()
          .then(incrementCounter())
          .then(isHatEmpty(cluesInHat))
          .then(setCurrentClue(cluesInHat[clueCount]))
    }

    function incrementCounter(){
     return new Promise((resolve, reject) => {
        setClueCount(clueCount + 1)
     })
    } 

    useEffect(() => {
        if (!timerStarted) return
        const intervalId = setInterval(() => {
          setTimeLeft(prevTimeLeft => {
            if (prevTimeLeft === 1) {
              clearInterval(intervalId)
              return <Redirect to='/the-hat-game/turn-over'/>
            } else {
              return prevTimeLeft - 1
            }
          })
        }, 1000);

        return () => {
            clearInterval(intervalId);
          }
        }, [timerStarted])

       

    return (
        <>
            { timerStarted ? null : <><h1>Have you picked up the hat?</h1> <h3>{ cluesInHat.length } clues left in hat</h3> </> }
            { timerStarted ? null : <button className="start-clock" onClick={startTurn}>Start the Clock</button> }
            { timerStarted ? <div className="time-left"> {timeLeft} </div> : null}
            { timerStarted && currentClue? <div>Current Clues: <br/><span className="current-clue">{currentClue.content}</span></div> : null }
            { timerStarted ? <button onClick={nextClue}>Next Clue</button> : null }  
            { props.emptyHatRedirect ? <Redirect to='/the-hat-is-empty'/> : null } 
        </>
    )
}
export default ActivePlayerScreen