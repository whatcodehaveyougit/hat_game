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
    const [turnCount, setTurnCount] = useState(0)
   
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
            resolve(array)
          })  
        }

    function isHatEmpty(clues){      
      return new Promise((resolve, reject) => {     
      if (clues.length === 0){
          setTimeLeft(0)
      } else {
        resolve(clues)
      }
    })
  }

  // For some reason this is not working
  // function goToEmptyHatPage(){
  //   return <Redirect to='/the-hat-is-empty'/>
  // }

    function shuffle(array) { 
      let counter = array.length;
      while (counter > 0) {
          let index = Math.floor(Math.random() * counter);
            counter--;
          let temp = array[counter];
          array[counter] = array[index];
          array[index] = temp;
      }
      setCluesInHat(array)
  }
    
    function startTurn() {
        setTimerStarted(true)
        props.getTeamsCurrentScore()
    }
  
     function setClueGuessedToTrue(){
      return new Promise((resolve, reject) => {
        resolve(
        cluesInHat[0] = true
        )
      })
    }

    function clueGuessedCorrectly(){
          props.onClueGuessed(cluesInHat[0].id)  
          setClueGuessedToTrue()
          .then(removeGuessedClueFromHatArray())
          .then(array => isHatEmpty(array))
    }

    function removeGuessedClueFromHatArray(){
     return new Promise((resolve, reject) => {
      const deck = cluesInHat;
          deck.shift();
          return(deck)
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
            { timerStarted ? <div>Current Clues: <br/><span className="current-clue">{ cluesInHat.length > 0 ? cluesInHat[0].content : <Redirect to='/the-hat-is-empty'/>  }</span></div> : null }
            { timerStarted ? <button onClick={clueGuessedCorrectly}>We got it! Next Clue Please!</button> : null }  
        </>
    )
}
export default ActivePlayerScreen