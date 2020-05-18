import React, {useState} from 'react'
import { Redirect } from 'react-router-dom'
import '../../App.css'

export default function AddClues(props){
const [redirect, setRedirect] = useState(false)

function handleRedirect(){
    setRedirect(true)
}

if(redirect) {
    return <Redirect to='/add-clues/player' />
}
    return(
        <>
      <h3>Tell every to refresh their page and start adding clues!</h3>
    </>
    )
}