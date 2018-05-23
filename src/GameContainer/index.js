import React, { Component } from 'react';
import Games from '../Games'
import PlayerGames from '../PlayerGames'

class GameContainer extends Component {
	constructor() {
		super()

		this.state = {
			games: [],
			player_id: '',
			game_id: [],
			available: false
		}

	} 

	componentDidMount(){
		this.getGames()
		.then((games) => {
			this.setState({games: games.all_games})
		})
		.catch((err) => {
			console.log(err)
		})
	}
	getGames = async () => {

		// console.log("This is before the fetch api call")

		const gamesJson = await fetch("http://localhost:9292/games", {
        	credentials: 'include'
     	}); 
		const games = await gamesJson.json()
    	return games
	
	}
	handleCheck = (event) => {
		// this.checkAvailability()
		this.checkAvailability(this.state.player_id, this.state.game_id, this.state.available)

		console.log(event.currentTarget.parentNode.dataset.gid)

		const gameId = event.currentTarget.parentNode.dataset.gid
		this.setState({
			game_id: gameId,
			available: true,
			player_id: this.props.playerId
		})

	}
	checkAvailability = async (player_id, game_id, available) => {
		// need to get player id gameid and available in here
		console.log(player_id, "<-- This is playerdId in checkAvailability")
		console.log(game_id, "This is gameId in checkAvailability")
		console.log(available, "this is available in checkAvailability")
		const availableResponse = await fetch("http://localhost:9292/available/players", {
			method: "POST",
			credentials: 'include', 
			body: JSON.stringify({
				player_id: player_id,
				game_id: game_id,
				available: available
				
			})
		})

		const parsedavailableResponse = await availableResponse.json();
		console.log(parsedavailableResponse, "<--- This is parsedavailableResponse")
		// need to get the id out of this
		// const playerId = this.props
		// this.setState({player_id: playerId})
		
	}

								
	render() {

		console.log(this.state, "<--- this.state in render in GameContainer");
		// console.log(this.props, "<--- This is props in GameContainer")
		return (

			<div>
				<Games handleCheck={this.handleCheck} games={this.state.games} />	
			</div>

		)
	

	}

}




export default GameContainer;