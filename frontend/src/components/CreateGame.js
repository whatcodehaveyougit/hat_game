import React,  { useState }from 'react'
import { Redirect } from 'react-router-dom'

const CreateGame = (props) => {
   const [title, setTitle] = useState('');
   const [redirect, setRedirect] = useState(null);

   const handleSubmit = (e) => {
    e.preventDefault();
    props.onGamePost(title)
    setTitle('');
    setRedirect(true)
   }

   if (redirect) {
    return <Redirect to='/create-teams' />
  }

    return(
        <form onSubmit={handleSubmit}>
            <label>Name of HatGame</label>
            <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} />
            <input type="submit" />
        </form>
    );
}

export default CreateGame