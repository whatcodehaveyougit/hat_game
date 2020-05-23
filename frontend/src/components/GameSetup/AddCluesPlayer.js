import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import '../../App.css'
import '../../style/game-setup.css'

export default function AddCluesPlayer(props){
const [clueContent, setClueContent] = useState('')
const [cluesAddedCounter, setCluesAddedCounter] = useState(0)

const handleClueSubmit = (e) => {
    e.preventDefault();
    props.onCluePost(clueContent)
    setClueContent('')
}

function clueAdded(){
    const newTotal = cluesAddedCounter + 1
    setCluesAddedCounter(newTotal)
}

    return (
        <>
            <h3>Now, Lets Start Adding Clues Amigo</h3>
                <form className="flex-container-center" onSubmit={handleClueSubmit}>
                    <input type="text" required value={clueContent} onChange={(e) => setClueContent(e.target.value)} />
                    <input type="submit" className="green-btn big-btn" onClick={clueAdded}/>
                </form>
                <div>
                     <h4><span className="clues-added-count">{cluesAddedCounter }</span> clues written so far</h4>
                    <h4>When you have finished writing ALL your clues</h4>  
                </div>
               
            <Link to="/">
                <button className="finshed-adding-clues yellow-btn big-btn" onClick={props.finishedAddingClues}>Submit All Clues to Virtual Hat</button>
            </Link>
        </>
    )
}