import React, { Component } from 'react';
import Games from '../Games'


class GameContainer extends Component {
	constructor() {
		super()
		this.state = {
			games: []
		}
	} 

	componentDidMount(){
		this.getGames()
		.then((games) => {
			this.setState({games: games.availgames})
		})
		.catch((err) => {
			console.log(err)
		})
	}
	getGames = async () => {
		console.log('getGames() is running')

		const id = this.props.playerId

		const gamesJson = await fetch("http://localhost:9292/player/signedup/" + id, {
        	credentials: 'include'
     	}); 
		const games = await gamesJson.json()
		console.log(games, "this is games in getGames")

    	return games
	
	}
	handleCheck = (event) => {

		const gameId = event.currentTarget.parentNode.dataset.gid

		const checkbox = event.currentTarget
	
		if(checkbox.checked){
			console.log(gameId, "was clicked and checkbox is on")
			this.addAvailability(checkbox, gameId)


		} else {
			console.log(gameId, "was clicked checkbox is off")
			// keep available FOR ONLY THAT GAME false 
			const id = event.currentTarget.id

			console.log(id, "<-- this is id in else statement")
			this.removeAvailability(gameId, id)
		}
			console.log(event.currentTarget.value, "<-- this is value of event")
	}

	addAvailability = async (checkbox, gameId) => {

		console.log("addAvailability is running")
		const availableResponse = await fetch("http://localhost:9292/available/players", {
			method: "POST", 		
			credentials: 'include', 
			body: JSON.stringify({
				player_id: this.props.playerId,
				game_id: gameId
		
			})
	 	})
	 	const parsedavailableResponse = await availableResponse.json();
	 	console.log(parsedavailableResponse, "<--- This is parsedavailableResponse")

	 	const availableId = parsedavailableResponse.available.id

	 	const newGame = [...this.state.games]
	 
		newGame[gameId - 1].available = true
		newGame[gameId - 1].availability_id = availableId



	 	if(parsedavailableResponse.success) {
	 		this.setState({
	 			games: newGame

	 		})
	 	}

	}

	removeAvailability =  async (gameId, id) => {
		console.log(gameId, "<< This is gameId in removeAvailability")
		console.log(id, "<< This is id in removeAvailability")
		console.log("removeAvailability is running")
		const removeResponse = await fetch("http://localhost:9292/available/players/" + id, {
			method: "DELETE",
			credentials: 'include'
		})
		const parsedremoveResponse = await removeResponse.json()
		console.log(parsedremoveResponse, "<-- This is parsedavailableResponse")

		const newGameRemove = [...this.state.games]

	 	newGameRemove[gameId - 1].available = false
	 
		if(parsedremoveResponse.success){
			this.setState({
				games: newGameRemove
			})
		}
	}
								
	render() {

		console.log(this.state, "<--- this.state in render in GameContainer");
		console.log(this.state.games, "<---this is this.state.games")
		// console.log(this.props.username, "<--- This is username in GameContainer")

		return (

			<div>
				<Games username={this.props.username}handleCheck={this.handleCheck} games={this.state.games} />	
			</div>

		)
	

	}

}




export default GameContainer;