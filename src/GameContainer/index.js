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

		const id = this.props.playerId

		const gamesJson = await fetch("https://sublist.herokuapp.com/player/signedup/" + id, {
        	credentials: 'include'
     	}); 
		const games = await gamesJson.json()

    	return games
	
	}
	handleCheck = (event) => {

		const gameId = event.currentTarget.parentNode.dataset.gid

		const checkbox = event.currentTarget
	
		if(checkbox.checked){
			this.addAvailability(checkbox, gameId)


		} else {
	
			const id = event.currentTarget.id
			this.removeAvailability(gameId, id)
		}
			
	}

	addAvailability = async (checkbox, gameId) => {

	
		const availableResponse = await fetch('https://sublist.herokuapp.com/available/players', {
			method: "POST", 		
			credentials: 'include', 
			body: JSON.stringify({
				player_id: this.props.playerId,
				game_id: gameId
		
			})
	 	})
	 	const parsedavailableResponse = await availableResponse.json();
	

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
		const removeResponse = await fetch("https://sublist.herokuapp.com/available/players/" + id, {
			method: "DELETE",
			credentials: 'include'
		})
		const parsedremoveResponse = await removeResponse.json()
	

		const newGameRemove = [...this.state.games]

	 	newGameRemove[gameId - 1].available = false
	 
		if(parsedremoveResponse.success){
			this.setState({
				games: newGameRemove
			})
		}
	}
								
	render() {

		return (

			<div>
				<Games username={this.props.username}handleCheck={this.handleCheck} games={this.state.games} />	
			</div>

		)
	

	}

}




export default GameContainer;