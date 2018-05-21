import React, {Component} from 'react';
import GameContainer from '../GameContainer'
import PlayerContainer from '../PlayerContainer'
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
			loggedIn: false,
	

		}
	}
	handleSubmit = (e) => {
    	e.preventDefault();
    	this.props.doRegister(this.state.playerId, this.state.name, this.state.username, this.state.password, this.state.pos, this.state.email, this.state.phone)	
    	this.setState({
    		loggedIn: true,


  
    	})
  	}


	handleInput = (e) => {

	  const state = this.state;
	  state[e.currentTarget.name] = e.currentTarget.value
	  this.setState(state)

	}

	

	render(){

		// console.log(this.state, "<-- this is state in PlayerRegistration");
		console.log(this.props, "<-- This is props in PlayerRegistration")
		return(
			<div>

			{
				this.state.loggedIn
				?
				<GameContainer PlayerId={this.props.playerId}/>

			:
				<div className="form">
				<form onSubmit={this.handleSubmit}>
					<input type="text" name="name" placeholder="name" onChange={this.addPlayer}/><br/>
					<input type="text" name="username" placeholder="desired username" value={this.state.username} onChange={this.handleInput}/><br/>
		          	<input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleInput} /><br/>
		          	<input type="text" name="pos" placeholder="position"/><br/>
		          	<input type="email" name="email" placeholder="email"/><br/>
		          	<input type="text" name="phone number" placeholder="phone number"/><br/>

					<input type='Submit' value="register"/> <br />


				
				</form>
				</div>
				}
		
				

			</div>



		)
	}
	
}





export default PlayerRegistration;