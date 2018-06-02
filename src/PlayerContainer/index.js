import React, {Component} from 'react';
import PlayerRegistration from '../PlayerRegistration';
// import Players from '../Players'
import GameContainer from '../GameContainer'
import './style.css'
import PlayerLogin from '../PlayerLogin'

class PlayerContainer extends Component {
	constructor(){
		super();
		this.state = {
			playerId: '',
			username: "",
			players: [],
			modalOpen: false,
			editPlayer: '',
			loggedIn: false,
			register: true,
			loginOrRegister: '',
      		buttons: true,
      		loginError: ""
      		
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

		const playersJson = await fetch('https://sublist.herokuapp/player',{
			credentials: 'include'
		})
		const players = await playersJson.json();
		console.log(players, '<-- this is players in getPlayers()')
			return players;
	
	}
	addPlayer = async (name, username, password, pos, email, phone) => {
		console.log('this is in add player')
		const playersJson = await fetch('https://sublist.herokuapp/player',{
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
		// console.log(playersJson, "<-- this is players json")

		const newPlayer = await playersJson.json();
		console.log(newPlayer, "<---- newPlayer in addPlayer()")
		
			this.setState({players: [...this.state.players, newPlayer.player]});
	
			return newPlayer;
	}


	doRegister = async (name, username, password, pos, email, phone) => {
		console.log("this is inside do Register")
		console.log(name, 'this is name')
		console.log(pos, 'this is poooooooos')
		console.log(email, "this is email")
		console.log(phone, "this is phone")

		const responsePromise = await fetch('https://sublist.herokuapp/player/register', {

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
		const responsePromise = await fetch('https://sublist.herokuapp/player/login', {
			method: 'POST',
			credentials: 'include', //you must include thiss line
			body: JSON.stringify({
				username: username,
				password: password
			})
		})
		console.log(parsedLoginResponse)
		const parsedLoginResponse = await responsePromise.json();
		if(parsedLoginResponse.success){
			this.setState({
				loggedIn: true,
				playerId: parsedLoginResponse.player_id,
				username: parsedLoginResponse.username
			})
		
		}else{
			this.setState({
				loginError: parsedLoginResponse.message
			})
		}
	}

	doLogout = async () => {
		const logoutResponsePromise = await fetch('https://sublist.herokuapp/player/logout', {
			credentials: 'include', 
		})
		this.setState({loggedIn: false})
	}

	handleClick = (e) => {
	    console.log(e.currentTarget.id)
	    this.setState({
		    buttons: false,
		    loginOrRegister: e.currentTarget.id
	    })
	}
	
	render(){
		// console.log(this.state, 'this is state in PlayerContainer---------------------------')
		if(this.state.loggedIn) {

			return <GameContainer username={this.state.username} doLogout={this.doLogout}playerId={this.state.playerId}/>
		}

		else  {


			return (
		
				this.state.buttons 
		      	?
		      	<div className="welcome">
		          <h1 className="content"> Play when you can </h1>
		          <p className="content">Would you like to join a team, but can't commit fulltime? </p>
		          <div className="form-container">
		            <button id="register" onClick={this.handleClick}>Register</button>   
		            <button id="login" onClick={this.handleClick}>Login</button>
		          </div> 
			    </div>
		   	   	:
		      	<div>
		      		{ this.state.loginOrRegister === "register" ? <PlayerRegistration playerId={this.state.playerId} addPlayer={this.addPlayer} doRegister={this.doRegister} /> : <PlayerLogin doLogin={this.doLogin} loginError={this.state.loginError} /> }
				</div>

			)
		}
	}
}







export default PlayerContainer;
