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

		const playersJson = await fetch('https://sublist.herokuapp.com/player',{
			credentials: 'include'
		})
		const players = await playersJson.json();
			return players;
	
	}
	addPlayer = async (name, username, password, pos, email, phone) => {
		const playersJson = await fetch('https://sublist.herokuapp.com/player',{
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
		
			this.setState({players: [...this.state.players, newPlayer.player]});
	
			return newPlayer;
	}


	doRegister = async (name, username, password, pos, email, phone) => {

		const responsePromise = await fetch('https://sublist.herokuapp.com/player/register', {

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
		const player_id = parsedRegisterResponse.player_id
		this.setState({
			playerId: player_id,
			loggedIn: true
		})
	}


	doLogin = async (username, password) => {
		const responsePromise = await fetch('https://sublist.herokuapp.com/player/login', {
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
		const logoutResponsePromise = await fetch('https://sublist.herokuapp.com/player/logout', {
			credentials: 'include', 
		})
		this.setState({loggedIn: false})
	}

	handleClick = (e) => {
	    this.setState({
		    buttons: false,
		    loginOrRegister: e.currentTarget.id
	    })
	}
	
	render(){
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
