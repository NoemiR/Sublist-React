import React, { Component } from 'react';
import Games from '../Games'
import PlayerGames from '../PlayerGames'

class GameContainer extends Component {
	constructor() {
		super()

		this.state = {
			games: [],
			game1: {
				player_id: '',
				game_id: '',
				available: false
			},
			game2: {
				player_id: '',
				game_id: '',
				available: false
			},
			game3: {
				player_id: '',
				game_id: '',
				available: false
			},
			game4: {
				player_id: '',
				game_id: '',
				available: false	
			},
			game5: {
				player_id: '',
				game_id: '',
				available: false	
			},
			game6: {
				player_id: '',
				game_id: '',
				available: false
			},
			game7: {
				player_id: '',
				game_id: '',
				available: false	
			},
			game8: {
				player_id: '',
				game_id: '',
				available: false
			}
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
	
		// console.log(event.currentTarget.parentNode.dataset.gid)
		// Need to get value of checkbox
			// e.current.target.value

		const gameId = event.currentTarget.parentNode.dataset.gid
		console.log(gameId, "<--- This is gameId")
		// console.log(event.currentTarget.parentNode.dataset.gid.value, "<--this is e.current.target.value")

		// if gameId = 1 and checkbox value equal checked then update state in gameOne with player id, game id, and available

			if(gameId === "1") {
			console.log("Game 1 was clicked")
				this.setState({
				game1: {
					player_id: this.props.playerId,
					game_id: gameId,
					available: true
			}
			})
		}	else if(gameId === "2") {
			console.log("Game 2 was clicked")
				this.setState({
					game2: {
						player_id: this.props.playerId,
						game_id: gameId,
						available: true
				}
				})		
		} 	else if(gameId === "3") {
			console.log("Game 3 was clicked")
				this.setState({
					game3: {
						player_id: this.props.playerId,
						game_id: gameId,
						available: true
				}
				})	
		}	else if(gameId === "4") {
			console.log("Game 4 was clicked")
			this.setState({
					game4: {
						player_id: this.props.playerId,
						game_id: gameId,
						available: true
				}
				})	
		}	else if(gameId === "5") {
			console.log("Game 5 was clicked")
				this.setState({
					game5: {
						player_id: this.props.playerId,
						game_id: gameId,
						available: true
				}
				})	
		
		} 	else if(gameId === "6") {
			console.log("Game 6 was clicked")
				this.setState({
					game6: {
						player_id: this.props.playerId,
						game_id: gameId,
						available: true
				}
				})	
		}	else if(gameId === "7") {
			console.log("Game 7 was clicked")
				this.setState({
					game7: {
						player_id: this.props.playerId,
						game_id: gameId,
						available: true
				}
				})	
		} 	else if(gameId === "8") {
			console.log("Game 8 was clicked")
				this.setState({
					game8: {
						player_id: this.props.playerId,
						game_id: gameId,
						available: true
				}
				})	
		}		

		// ##################

		// FOR EVERY GAME I NEED TO SEND OVER PLAYER ID, GAME ID AND AVAILABLE (TRUE OR FALSE)
			// If i send over state for each game that should be whats happening
			// The true or false gets changed based on if the box is checked not 
		// previously was only sending it for one game. (created 8 games in state)

		// FOR EVERY PLAYER THAT CLICKS SUBMIT THIS NEEDS TO HAPPEN

		// ID PLAYER 6 GAME ID 1 FALSE 
		// ID PLAYER 6 GAME ID 2 TRUE
		// ID PLAYER 6 GAME ID 3 TRUE
		// ETC ETC	

		// WHAT DO I NEED TO CHANGE ON BACK END
			// Create 8 availibiliity tables one for each game
			// each table needs to have player id game id and boolean. this is whats being set in state. each game has this
			// How to send this to database



		this.checkAvailability()

		// (this.state.game1, this.state.game2, this.state.game3, this.state.game4, this.state.game5, this.state.game6. this.state.game7, this.state.game8)

	
	}
	checkAvailability = async () => {
		console.log("checkAvailability function is running")
		// console.log(game1, "<---- This is game1 in checkAvailability()------")
		// Pay load is empty right now in

		// This is what is being sent over to database. 
		const availableResponse = await fetch("http://localhost:9292/available/players", {
			method: "POST",
			credentials: 'include', 
			body: JSON.stringify({
				game1: this.state.game1,
				game2: this.state.game2,
				game3: this.state.game3,
				game4: this.state.game4,
				game5: this.state.game5,
				game6: this.state.game6,
				game7: this.state.game7,
				game8: this.state.game8,	
				
			})
		})

		const parsedavailableResponse = await availableResponse.json();
		console.log(parsedavailableResponse, "<--- This is parsedavailableResponse")
		// This is 8 new availailtibies but game id player id is null. every available is true 
		// This and state should be the same but they are different

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