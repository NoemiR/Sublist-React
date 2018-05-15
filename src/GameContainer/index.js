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
		  console.log(games, "<-- This is games in getGames Function");
	      return games
		
	}
	render() {

		// console.log(this.state, "<--- this.state in render in GameContainer");
		return (

			<div>
				
			<Games games={this.state.games} getGames={this.getGames} />	

			</div>

		)
	

	}
}




export default GameContainer;