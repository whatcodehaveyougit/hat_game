import React ,{useState} from 'react'
import '../App.css'

export default function CreateTeams(props){
    const [playerName, setPlayerName] = useState('');
    const [teamName, setTeamName] = useState('');
    const [submittedTeamName, setSubmittedTeamName] = useState('');
    const [submittedPlayers, addSubmittedPlayer] = useState([])

    const handlePlayerSubmit = (e) => {
        e.preventDefault();
        props.onPlayerPost(playerName, teamName)
        setPlayerName('');
        setTeamName('');
        // setRedirect(true)
       }

    const handleTeamNameSubmit = (e) => {
        e.preventDefault();
        setSubmittedTeamName(teamName)
    }

    const handleClick = () => { // Save search term state to React Hooks
      // Add the search term to the list onClick of Search button
      // (Actually searching would require an API call here)
      // Save search term state to React Hooks
      addSubmittedPlayer(submittedPlayers => [...submittedPlayers, query])
    }

  
    

    return(
        <>
            <h3>Now lets create teams for <span class="game-title">{ props.createdGame.title }</span> </h3>
            
            <label>How many players are in this team?</label>
            <input type="number" name="maxPlayersPerTeam" min="1" max="5" />
                
            <form onSubmit={handleTeamNameSubmit}>
                <div>
                    <label>Team Name:</label>
                    <input type="text" name="teamName" required value={teamName} onChange={(e) => setTeamName(e.target.value)} />  
                    <input type="submit"></input> 
                </div>
            </form>
                

            <form onSubmit={handlePlayerSubmit}>
                <label>Player Name</label>
                <input type="text" name="playerName" required value={playerName} onChange={(e) => setPlayerName(e.target.value)} />  
                <input type="submit" onClick={handleClick}></input> 

                { submittedTeamName ? <h3>{submittedTeamName}</h3> : null } 
                { submittedPlayers ? submittedPlayers.map(player => {
                    <p>player.</p>
                }) : null } 

            </form>
        </>
    )
}