import React, { Component } from 'react';
import Games from '../Games'
import PlayerGames from '../PlayerGames'

class GameContainer extends Component {
	constructor() {
		super()
		this.state = {
			games: [],
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

		// console.log("This is before the fetch api call")

		const gamesJson = await fetch("http://localhost:9292/player/signedup/" + id, {
        	credentials: 'include'
     	}); 
		const games = await gamesJson.json()
		console.log(games, "this is games in getGames")

    	return games
	
	}
	handleCheck = (event) => {

		console.log('handle check is being run')

		// hit the route new route and have a check box appear if available is true
		// # 1 Get checkboxes to already appeared checked if they are true
			// # be able to change them 
		// # 2 change availability for only that game and update state for only that game
		
		const gameId = event.currentTarget.parentNode.dataset.gid
		// // console.log(event.currentTarget.parentNode.dataset.gid.value, "<--this is e.current.target.value")
		// console.log(gameId, "<--- This is gameId")
		const checkbox = event.currentTarget
		console.log(event.currentTarget, "THIS IS CURRENT TARGET")

		// const available = this.state.games.map((game, i) => {
		// 	// console.log(game, "<--- This is each game")
		// 	if(gameId === game.id && checkbox.checked){
		// 		game.available === true
		// 		console.log("checkbox is on")
		// 	} else {
		// 		console.log("checkbox is off ")
		// 	}

		// })

		// 
		
		if(checkbox.checked){
			console.log(gameId, "was clicked and checkbox is on")
			// change available FOR ONLY THAT GAME (game.available) to true
			this.addAvailability(checkbox, gameId)


		} else {
			console.log(gameId, "was clicked checkbox is off")
			// keep available FOR ONLY THAT GAME false 
			const id = event.currentTarget.id
			this.removeAvailability(gameId, id)
		}
		
	}

	addAvailability = async (checkbox, gameId) => {
		// # 1 Need to send over to db player_id and game_id because of the availiblity table 
			// not able to get gameId in this function as its currently structured
			console.log(gameId, " this is game ID in addAvailability")

		console.log("addAvailability is running")
		const availableResponse = await fetch("http://localhost:9292/available/players", {
			method: "POST", 		
			credentials: 'include', 
			body: JSON.stringify({
				// games: this.state.games,		
				player_id: this.props.playerId,
				game_id: gameId
		
			})
	 	})
	 	const parsedavailableResponse = await availableResponse.json();
	 	console.log(parsedavailableResponse, "<--- This is parsedavailableResponse")

	 	const availableId = parsedavailableResponse.available.id
	 	checkbox.id = availableId

	 	const newGame = [...this.state.games]
	 

	 	newGame[gameId - 1].available = true


	 	if(parsedavailableResponse.success) {
	 		this.setState({
	 			games: newGame

	 		})
	 	}

	}

	removeAvailability =  async (gameId, id) => {

		console.log("removeAvailability is running")
		const removeResponse = await fetch("http://localhost:9292/available/players/" + id, {
			method: "DELETE"
			// credentials: 'include', 
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
		// console.log(this.props, "<--- This is props in GameContainer")
		return (

			<div>
				<Games handleCheck={this.handleCheck} games={this.state.games} />	
			</div>

		)
	

	}

}




export default GameContainer;