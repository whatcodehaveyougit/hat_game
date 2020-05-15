import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import '../../App.css'
import team from '../../assets/team.png'

export default function CreateTeams(props){
    const [playerName, setPlayerName] = useState('');
    const [submittedPlayers, setSubmittedPlayers] = useState([]);
    const [teamName, setTeamName] = useState('');
    const [submittedTeamName, setSubmittedTeamName] = useState('');
    const [submittedTeams, addSubmittedTeam] = useState([]);
    const [displaySubmittedTeams, setDisplaySubmittedTeams] = useState(false);
    const [displayNewTeamsButton, setDisplayNewTeamsButton] = useState(false)

    const [redirect, setRedirect] = useState(false);

    const handlePlayerSubmit = (e) => {
        e.preventDefault();
        props.onPlayerPost(playerName, teamName)
        setSubmittedPlayers(submittedPlayers => [...submittedPlayers, playerName])
        setPlayerName('');
        setTeamName('');
        setDisplayNewTeamsButton(true)
       }

    const handleTeamNameSubmit = (e) => {
        e.preventDefault();
        props.onTeamPost(teamName)
        setSubmittedTeamName(teamName)
    }

    const addNewTeam = (e) => {
        addSubmittedTeam(submittedTeams => [...submittedTeams, submittedTeamName]);
        setSubmittedTeamName(null);
        setSubmittedPlayers('')
        setDisplaySubmittedTeams(true);
    }
    
    return(
        <>
            <h3>Now lets create teams for <span className="game-title">{ props.createdGame.title }</span> </h3>
            
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

                { submittedTeamName ? <h3>{ "TeamName: " + submittedTeamName}</h3> : null } 
                { submittedPlayers ? 
                <ul className="players-in-team">
                    {submittedPlayers.map((player, i) => (
                    <li key={i}>{ player} </li>
                    ))}
                </ul> : null }

                    { submittedPlayers.length > 0 ? 
                        <div> 
                            <h4>When your team is complete...</h4>
                            <button className="add-team" onClick={addNewTeam}>Add Team {submittedTeamName} to The Hat Game!</button> 
                        </div> : null }
                    
                { displaySubmittedTeams ?
                        <div>
                            { submittedTeams ? 
                            <div className="teams-added-container">
                                {submittedTeams.map((teamName, i) => (
                                <div className="team-in-hat" key={i}>
                                    <h4>{ teamName } </h4>
                                    <img className="team" src={ team } />  
                                </div>    
                                    ))} 
                            </div>
                             : null }
                        </div> : null}
            { submittedTeams.length > 1 && <div>
                {/* <label>How many clues can each player add to the hat?</label> */}
                {/* <input type="number" name="maxPlayersPerTeam" min="1" max="7" /> */}
                <h3>Finished Adding Teams?</h3>
                
                <div>
                    <Link to="/add-clues"><button>Start Adding Clues to the Hat</button></Link>
                </div>
            </div> }
        </>
    )
}