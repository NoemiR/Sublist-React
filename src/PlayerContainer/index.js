import React, {Component} from 'react';
import PlayerRegistration from '../PlayerRegistration';
import Players from '../Players'
import GameContainer from '../GameContainer'
import './style.css'
import PlayerLogin from '../PlayerLogin'


class PlayerContainer extends Component {
	constructor(){
		super();
		this.state = {
			players: [],
			modalOpen: false,
			editPlayer: '',
			loggedIn: false,
			register: true
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
			console.log(players)
			return players;
			console.log(players)
	}
	addPlayer = async (name) => {
		const playersJson = await fetch('http://localhost:9292/player',{
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify({name: name})
		})
		const newPlayer = await playersJson.json();
      		console.log(newPlayer.player, ' this is names')
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
	
	render(){
		return (
			<div>
				{
					this.state.loggedIn 
					?
					<div>
				
						<GameContainer />
					</div>
					:

					<div> 

						{
							this.state.register 
							? 
							<PlayerRegistration addPlayer={this.addPlayer} doRegister={this.doRegister} /> 
							: 
							<PlayerLogin doLogin={this.doLogin} />
						}
					</div>
				}
			</div>
		)
	}
}







export default PlayerContainer;