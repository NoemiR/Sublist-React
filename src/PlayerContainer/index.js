import React, {Component} from 'react';
import PlayerRegistration from '../PlayerRegistration';
import Players from '../Players'
import GameContainer from '../GameContainer'
import './style.css'
import PlayerLogin from '../PlayerLogin'
//import EditModal from '../EditModal'


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
	editPlayer = async (props, id) => {
		console.log(id)
			const player = await fetch('http://localhost:9292/player/' + id, {
				method: 'PUT',
				body: JSON.stringify({props: props})
		});
		const response = await player.json();
		const editedPlayerIndex = this.state.player.findIndex((player) => {
			console.log(player, response)
			return player.id === response.updated_player.id

		})
		const state =  this.state;
			state.players[editedPlayerIndex]= response.updated_player;
			state.modalOpen = true;
			this.setState(state);
		

	}
	openModal = (e) => {
		// const id = e.currentTarget.previousSibling.id;
		const playerId = parseInt(e.target.previousSibling.id)
		const editedPlayer = this.state.players.find((player) => {
			return player.id === playerId

		})
		this.setState({
			modalOpen: true,
			editedPlayer: editedPlayer
		})

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
						<Players players={this.state.players} getPlayers={this.getPlayers} />
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





// <EditModal modalState={this.state.modalOpen} editedPlayer={this.state.editedIPlayer} editPlayer={this.editPlayer}/>