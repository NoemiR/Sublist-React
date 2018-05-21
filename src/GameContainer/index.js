import React, { Component } from 'react';
import Games from '../Games'
import PlayerGames from '../PlayerGames'
import PlayerContainer from '../PlayerContainer'

class GameContainer extends Component {
	// constructor() {
	// 	super()

	// 	this.state = {
	// 		games: [],
	// 		playerId: "",
	// 		players:[],
	// 		available: false
	// 	}

	// } 

	// componentDidMount(){
	// 	this.getGames()
		
	// 	.then((games) => {
	// 		this.setState({games: games.all_games})
	// 	})
	// 	.catch((err) => {
	// 		console.log(err)
	// 	})
	// }
	// getGames = async () => {

	// 	// console.log("This is before the fetch api call")

	// 	const gamesJson = await fetch("http://localhost:9292/games", {
 //        	credentials: 'include'
 //     	}); 
	// 	  const games = await gamesJson.json()
	//       return games
		
	// }

													

	// render() {

	// 	// console.log(this.state, "<--- this.state in render in GameContainer");
	// 	console.log(this.props, "<--- This is props in GameContainer")
	// 	return (

	// 		<div>
				
	// 		<Games playerId={this.props} games={this.state.games} />	



	// 		</div>

	// 	)
	

	// }
	render() {
		return(<h1>This is game Container</h1>)
	}
}




export default GameContainer;