import React, {useState} from 'react'
import { Redirect } from 'react-router-dom'

export default function AddCluesPlayer(props){
const [clueContent, setClueContent] = useState('')
const [redirect, setRedirect] = useState(false)

const handleClueSubmit = (e) => {
    e.preventDefault();
    props.onCluePost(clueContent)
    setClueContent('')
}

function handleRedirect(){
    setRedirect(true)
}

if(redirect) {
    return <Redirect to='/' />
}


    return (
        <>
            <h3>Please Add Your Chosen Clues to the Hat!</h3>
            <form onSubmit={handleClueSubmit}>
                <input type="text" required value={clueContent} onChange={(e) => setClueContent(e.target.value)} />
                <input type="submit" />
            </form>

            <button onClick={handleRedirect}>Finished Adding Clues!</button>
        </>
    )
}