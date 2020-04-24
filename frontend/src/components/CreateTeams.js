import React ,{useState} from 'react'
import '../App.css'
import team from '../style/team.png'

export default function CreateTeams(props){
    const [playerName, setPlayerName] = useState('');
    const [submittedPlayers, setSubmittedPlayers] = useState([]);

    const [teamName, setTeamName] = useState('');
    const [submittedTeamName, setSubmittedTeamName] = useState('');
    const [submittedTeams, addSubmittedTeam] = useState([]);
    const [displaySubmittedTeams, setDisplaySubmittedTeams] = useState(false);
    const [displayNewTeamsButton, setDisplayNewTeamsButton] = useState(false)

    const handlePlayerSubmit = (e) => {
        e.preventDefault();
        props.onPlayerPost(playerName, teamName)
        setPlayerName('');
        setTeamName('');
        setSubmittedPlayers(submittedPlayers => [...submittedPlayers, playerName])
        setDisplayNewTeamsButton(true)
        // setRedirect(true)
       }

    const addNewTeam = (e) => {
        addSubmittedTeam(submittedTeams => [...submittedTeams, submittedTeamName]);
        setSubmittedTeamName('');
        setSubmittedPlayers('')
        setDisplaySubmittedTeams(true);
    }

    const handleTeamNameSubmit = (e) => {
        e.preventDefault();
        setSubmittedTeamName(teamName)
    }

    // const handleClick = () => { 
    // }

  
    

    return(
        <>
            <h3>Now lets create teams for <span className="game-title">{ props.createdGame.title }</span> </h3>
            
            <label>How many clues can each player add to the hat?</label>
            <input type="number" name="maxPlayersPerTeam" min="1" max="7" />
                
            { submittedTeamName ? null : <form onSubmit={handleTeamNameSubmit}>
                <div>
                    <label>Team Name:</label>
                    <input type="text" name="teamName" required value={teamName} onChange={(e) => setTeamName(e.target.value)} />  
                    <input type="submit"></input> 
                </div>
            </form>
}
                
            { submittedTeamName ? 
            <form onSubmit={handlePlayerSubmit}>
                <label>Player Name</label>
                <input type="text" name="playerName" required value={playerName} onChange={(e) => setPlayerName(e.target.value)} />  
                <input type="submit"></input> 
            </form> : null
}

                { submittedTeamName ? <h3>{submittedTeamName}</h3> : null } 
                { submittedPlayers ? 
                <ul className="players-in-team">
                    {submittedPlayers.map((query, i) => (
                    <li>{ query} </li>
                    ))}
                </ul> : null }

                    { displayNewTeamsButton ? 
                        <div> 
                            <button onClick={addNewTeam}>Add {submittedTeamName} to Game!</button> 
                        </div> : null }
                    
                { displaySubmittedTeams ?
                        <div>
                            { submittedTeams ? 
                            <div className="teams-added-container">
                                {submittedTeams.map((teamName, i) => (
                                <div className="team-in-hat">
                                <h4>{ teamName } </h4>
                                <img className="team" src={ team } />  
                                </div>    
                                    ))} 
                            </div>
                             : null }
                        </div> : null}
            
        </>
    )
}