import React, { Component } from 'react';
import TeamLoginRegister from '../TeamLoginRegister'
import Players from '../Players'
import PlayerRegistration from '../PlayerRegistration'

class TeamContainer extends Component {
	constructor(){
		super()

		this.state = {
			players: [],
			loginError: "",
      		loggedIn: false
		}
	}

	componentDidMount(){
		// this.getPlayers()

		// .then((players) => {
		// 	this.setState({players: players.all_players})
		// })
		// .catch((err) => {
		// 	console.log(err)
		// })
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

	doLogin = async (username, password) => {
			console.log("You are trying to Log In ");

			const resolvedLoginPromise = await fetch('http://localhost:9292/team/login', {
		      method: "POST",
		      credentials: 'include', 
		      body: JSON.stringify({
		        username: username,
		        password: password
	      })
	    })

		const parsedLoginResponse = await resolvedLoginPromise.json()
	    console.log("heres what happened when you tried to login")
	    console.log(parsedLoginResponse)
	    if(parsedLoginResponse.success) {
	    	this.setState({
	    		loggedIn: true
	    	})
		    this.getPlayers()
	          .then((items) => {
	            console.log(items)
	            this.setState({players: players.all_players})
	          })
	          .catch((err) => {
	            console.log(err)
	          })
	    }
	}

	doRegister = async (username, password) => {
		
			const resolvedRegisterPromise = await fetch('http://localhost:9292/team/register', {
		      method: "POST",
		      credentials: 'include', 
		      body: JSON.stringify({
		        username: username,
		        password: password
		  })
		})

			const parsedRegisterResponse = await resolvedRegisterPromise.json()
			console.log("heres what happened when you tried to Register")
			console.log(parsedRegisterResponse)
			if(parsedRegisterResponse.success) {
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
			}

	}

	render(){

		console.log(this.state, "<--- This is this.state in render in Team Container")

		return(
			<div>
				{this.state.loggedIn ?
			<div>
			<Players players={this.state.players} getPlayers={this.getPlayers} />	
			</div>
			: <TeamLoginRegister doLogin={this.doLogin} doRegister={this.doRegister} />
			}
			</div>

			)
	}


}

export default TeamContainer