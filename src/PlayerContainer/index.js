import React, {Component} from 'react';
import PlayerRegistration from '../PlayerRegistration';
import Players from '../Players'
import GameContainer from '../GameContainer'
import './style.css'
import PlayerLogin from '../PlayerLogin'
import Games from '../Games'

class PlayerContainer extends Component {
	constructor(){
		super();
		this.state = {
			playerId: '',
			players: [],
			modalOpen: false,
			editPlayer: '',
			loggedIn: false,
			register: true,
			loginOrRegister: '',
      		buttons: true
		}
	}
	componentDidMount(){
		this.getPlayers()

		.then((players) => {
			this.setState({players: players.all_players})
		})
		.catch((err) => {
			console.log(err)
		})
	}
	getPlayers = async () => {

		const playersJson = await fetch('http://localhost:9292/player',{
			credentials: 'include'
		})
		const players = await playersJson.json();
		console.log(players, '<-- this is players in getPlayers()')
			return players;
	
	}
	addPlayer = async (name, username, password, pos, email, phone) => {
		console.log('this is in add player')
		const playersJson = await fetch('http://localhost:9292/player',{
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify({
				name: name,
				username: username,
				password: password,
				pos: pos,
				email: email,
				phone: phone
			})

		})
		console.log(playersJson, "<-- this is players json")

		const newPlayer = await playersJson.json();
		console.log("this is after new player")
			this.setState({players: [...this.state.players, newPlayer.player]});
	
			return newPlayer;

	}


	doRegister = async (name, username, password, pos, email, phone) => {
		
		const responsePromise = await fetch('http://localhost:9292/player/register', {
			method: 'POST',
			credentials: 'include', 
			body: JSON.stringify({
				name: name,
				username: username,
				password: password,
				pos: pos,
				email: email,
				phone: phone
			})

		})

		const parsedRegisterResponse = await responsePromise.json();
		console.log(parsedRegisterResponse, "<----this is parsedRegisterResponse  in doRegister")
		console.log(parsedRegisterResponse.player_id, "<--- This is playerid")
		const player_id = parsedRegisterResponse.player_id
		this.setState({
			playerId: player_id,
			loggedIn: true
		})

		console.log(this.state, "this is state in do register after player id is assigned")


	}


	doLogin = async (username, password) => {
		const responsePromise = await fetch('http://localhost:9292/player/login', {
			method: 'POST',
			credentials: 'include', //you must include thiss line
			body: JSON.stringify({
				username: username,
				password: password
			})
		})
		const parsedLoginResponse = await responsePromise.json();
		if(parsedLoginResponse.success){
			this.setState({
				loggedIn: true
			})
			this.getPlayers()
			.then((players) => {
				this.setState({players: players.all_players})
			})
			.catch((err) => {
				console.log(err)
			})
			}else{
				this.setState({
					loginError: parsedLoginResponse.message
			})
		}
	}

  handleClick = (e) => {
    console.log(e.currentTarget.id)
    this.setState({
      buttons: false,
      loginOrRegister: e.currentTarget.id
    })
  }
	
	render(){

		if(this.state.loggedIn) {

			return <GameContainer playerId={this.state.playerId}/>
		}

		else  {


			return (

		
				this.state.buttons 
		      	?
		      	<div className="welcome">
		          <h1 className="content"> Life's a soccer ball. Can you kick it?</h1>
		          <p className="content">Would you like to join a team, but can't commit fulltime? </p>
		            <button id="register" onClick={this.handleClick}>Register</button>   
		            <button id="login" onClick={this.handleClick}>Login</button>
			    </div>
		   	   	:
		      	<div>
		      		{ this.state.loginOrRegister === "register" ? <PlayerRegistration playerId={this.state.playerId} addPlayer={this.addPlayer} doRegister={this.doRegister} /> : <PlayerLogin doLogin={this.doLogin} /> }
				</div>

			)
		}
	}
}







export default PlayerContainer;
