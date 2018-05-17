
import React, {Component} from 'react';
import './style.css'


class PlayerRegistration extends Component {
	constructor(){
		super();
		this.state = {
			name: '',
			username: '',
			password: '',
			pos: '',
			email: '',
			phone: '',
			register: false,
		}
	}
	handleSubmit = (e) => {
    	e.preventDefault();
    	console.log('haye')
    	if(this.state.register){
    		this.setState(this.state.name, this.state.username, this.state.password, this.state.pos, this.state.email, this.state.phone)
    	}else{
    		this.setState(this.state.username, this.state.password)
    	}

   	  	
  	}

	handleInput = (e) => {
	  const whichField = e.currentTarget.name
		  if(whichField === "username") this.setState({ username: e.currentTarget.value })
		  else this.setState({password: e.currentTarget.value})
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

	registration = () => {
	    this.setState({
	     	register: true
	    })
	}
	loggingIn = () => {
    	this.setState({
      		register: false
    	})
  	}

	render(){
		return(
			<div>
			"i am the player registration form"



			



				<form onSubmit={this.handleSubmit}>

					<input type="text" name="name" placeholder="name" onChange={this.addPlayer}/>

					<input type="text" name="username" placeholder={this.state.username} value={this.state.username} onChange={this.handleInput} /><br/>

		          	<input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleInput} /><br />

		          	

		          	<input type="text" name="pos" onChange={this.handleInput} value={this.state.pos} placeholder="position"/>

		          	<input type="email" name="email" onChange={this.handleInput} value={this.state.email} placeholder="email"/>

		          	<input type="text" name="phone number" onChange={this.handleInput} value={this.state.phone} placeholder="phone number"/>

					<input type='submit' onChange={this.addPlayer}/>

				</form>
				

			</div>


		)
	}
	
}

export default PlayerRegistration;








// {this.props.logginError !== '' ? <p className="login-error">{this.props.loginError}</p> : null }
//         	<p><span className={this.state.register ? "current" : null} onClick={this.registration}>Register</span> •
//         	 <span className={this.state.register ? null : "current"} onClick={this.loggingIn}>Log in</span></p>
