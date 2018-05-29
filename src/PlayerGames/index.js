import React, {Component} from 'react'
import PlayerInfoModal from '../PlayerInfoModal'
import './style.css'


// This is what you see when you are logged in on Team Side

class PlayerGames extends Component {
	constructor(){
		super()
		this.state = {
			games: [],
			modalOpen: false,
			availPlayers: []

		}
	}

	getAvailPlayers = async (e) => {
		e.preventDefault();
		const id = e.currentTarget.id;

		const availplayersJson = await fetch("http://localhost:9292/available/games/players/" + id, {
			credentials: 'include'
		})
		const availPlayers = await availplayersJson.json()

			console.log(availPlayers, "<-----this is availPlayers")
		this.setState({
			availPlayers: availPlayers,
			modalOpen: true
		})
	}

	closeModal = () => {
		this.setState({modalOpen:false})
	}	

	render(){

		console.log(this.state, "this is state in render in the PlayerGames Component")

		const gamesList = this.props.games.map((game, i) => {
		// console.log(game, "<--- This is game in gamesList");
			return <li className="player-games"key={game.id}> <br/>
				{game.game_date}  <br/>
				{game.game_time} PM <br/>
				Team {game.team1_id} VS. Team {game.team2_id} <br/>
				<button className="view-players"id={game.id} onClick={this.getAvailPlayers}>View Players</button></li>

		})

		return (
			<div>
				{ this.state.modalOpen ? <PlayerInfoModal closeModal={this.closeModal}availPlayers={this.state.availPlayers} /> : null  }

				<div className="container">
				<button onClick={this.props.doLogoutTeam} className='logout'>Log Out</button>
					<h2 className="schedule">Game Schedule</h2>
					<h3>Click to see who's available for each game</h3>
				 	{gamesList}
				</div>

			</div>	


		)
	}
	
	
}


export default PlayerGames;