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
   
    // Happens on page load and after every turn
    // Having turnCount is not very elegant it has to be said. Not very description 
    useEffect(() => { 
      // Need this to happen on page load AND after someone's turn
      if(cluesArray && turnCount === 0){
        console.log(cluesArray);
        
        filterOutGuessedClues(cluesArray)
        .then(res => console.log("response " + res))
        .then(isHatEmpty()) 
        .then(shuffle(cluesInHat)) 
        console.log("use effect on mount"); 
    } else {
      filterOutGuessedClues(cluesInHat)
      .then(isHatEmpty()) 
      .then(shuffle(cluesInHat)) 
      console.log("use effect on mount"); 
    }
  }, [turnCount]);

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
    

  // THIS CHAIN OF PROMISES IS NOT WORKING !!!
    function startRound() {
        console.log("round started" );
        setTimerStarted(true)
        setCurrentClue(cluesInHat[clueCount]) 
        incrementCounter()
        props.getTeamsCurrentScore()
    }

    function nextClue(){
          props.onClueGuessed(currentClue.id)
          currentClue.guessed = true
          .then(incrementCounter())
          .then(isHatEmpty())
          .then(setCurrentClue(cluesInHat[clueCount]))
    }

    function incrementCounter(){
     return new Promise((resolve, reject) => {
        setClueCount(clueCount + 1)
     })
    } 

    function isHatEmpty(){
        return new Promise((resolve, reject) => {     
        if (cluesInHat.length === 0){
            props.endTurnSetDbScore()
            props.setEmptyHatRedirect(true)
            console.log(cluesInHat.length + "clues array length");
            
            return reject    
        } 
     })
    }
  
    useEffect(() => {
        if (!timerStarted) return

        const intervalId = setInterval(() => {
          console.log("timer ticks");
          setTimeLeft(prevTimeLeft => {
            if (prevTimeLeft === 1) {
              clearInterval(intervalId)
              setTurnCount(turnCount + 1)
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
            { timerStarted ? null : <h1>Have you picked up the hat?</h1> }
            { timerStarted ? null : <button className="start-clock" onClick={startRound}>Start the Clock</button> }
            { timerStarted ? <div className="time-left"> {timeLeft} </div> : null}
            { timerStarted && currentClue? <div>Current Clues: <br/><span className="current-clue">{currentClue.content}</span></div> : null }
            { timerStarted ? <button onClick={nextClue}>Next Clue</button> : null }  
            { props.emptyHatRedirect ? <Redirect to='/the-hat-is-empty'/> : null } 
        </>
    )
}
export default ActivePlayerScreen