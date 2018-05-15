import React, {Component} from 'react';
import PlayerRegistration from '../PlayerRegistration';
import Players from '../Players'


class PlayerContainer extends Component {
	constructor(){
		super();
		this.state = {
			players: [],
			modalOpen: false,
			editPlayer: '',
			loggedIn: false
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


	doRegister = async (username, password) => {

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
				{this.state.loggedIn ?
				<div>
					<p>This is the playerContainer</p>

					<Players players={this.state.players} getPlayers={this.getPlayers}/>
				</div>
				:<PlayerRegistration addPlayer={this.addPlayer} doRegister={this.doRegister}/>
				}
			</div>
		)
	}
}







export default PlayerContainer;