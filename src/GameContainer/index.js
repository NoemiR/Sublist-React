import React, { Component } from 'react';
import Games from '../Games'
import PlayerGames from '../PlayerGames'
import PlayerContainer from '../PlayerContainer'

class GameContainer extends Component {
	constructor() {
		super()
			this.state = {
				games: [],
				playerId: "",
				players:[],
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

	// getPlayerId = () => {

	// 	this.props.doRegister(this.state.playerId)
	// 	this.setState({playerId: player_id})

	// 	console.log(this.state, "this is state in get playerId function")

	// }

	render() {

		// console.log(this.state, "<--- this.state in render in GameContainer");
		return (

			<div>
				
			<Games games={this.state.games} />	


			</div>

		)
	

	}
}




export default GameContainer;