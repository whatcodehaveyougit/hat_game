import React, {useState} from 'react'
import { Link } from 'react-router-dom'

export default function AddCluesPlayer(props){
const [clueContent, setClueContent] = useState('')

const handleClueSubmit = (e) => {
    e.preventDefault();
    props.onCluePost(clueContent)
    setClueContent('')
}

    return (
        <>
            <h3>Please Add Your Chosen Clues to the Hat!</h3>
                <form onSubmit={handleClueSubmit}>
                    <input type="text" required value={clueContent} onChange={(e) => setClueContent(e.target.value)} />
                    <input type="submit" />
                </form>
            <Link to="/"><button>Finished Adding Clues!</button></Link>
        </>
    )
}