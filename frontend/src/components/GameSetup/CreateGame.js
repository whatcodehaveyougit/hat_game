import React,  { useState }from 'react'
import { Redirect } from 'react-router-dom'
import '../../App.css'
import '../../style/game-setup.css'

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
                <h3>Greetings Game Master</h3>
                <p>Please dream up a name for this particular hat game</p>
                <p>Feel free to ask the other players for their suggestions.</p>
            <div className="flex-container-center create-game">
                <label>Name of HatGame</label>
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} />
                <input type="submit" />
            </div>
        </form>
    );
}

export default CreateGame