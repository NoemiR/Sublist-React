import React, { Component } from 'react';
import Games from '../Games'
import PlayerGames from '../PlayerGames'
import PlayerContainer from '../PlayerContainer'

class GameContainer extends Component {
	constructor() {
		super()
			this.state = {
				games: [],
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
		  console.log(games, "<-- This is games in getGames Function");
	      return games
		
	}

	getPlayers = async () => {
		const playersJson = await fetch('http://localhost:9292/player',{
			credentials: 'include'
		})
		const players = await playersJson.json();
			console.log(players)
			return players;
			console.log(players)
	}
	addPlayer = async (name, username, password, pos, email, phone) => {
		const playersJson = await fetch('http://localhost:9292/player', {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify({
				name: name,
				username: username,
				password: password,
				pos: pos,
				email: email,
				phone: phone})
		})
		const newPlayer = await playersJson.json();
      		console.log(newPlayer.player, ' this is names')
			this.setState({players: [...this.state.players, newPlayer.player]});
			return newPlayer;

	}


	render() {

		// console.log(this.state, "<--- this.state in render in GameContainer");
		return (

			<div>
				
			<Games games={this.state.games} players={this.state.players}/>	



			</div>

		)
	

	}
}




export default GameContainer;