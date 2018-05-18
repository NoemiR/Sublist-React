import React, {Component} from 'react';
import GameContainer from '../GameContainer'
import './style.css'

class PlayerRegistration extends Component {
	constructor(){
		super();
		this.state = {
			playerId: '',
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

  	getPlayerId = (props) => {
  		console.log(props, "this is props")
  		this.props.doRegister()
  		console.log("this is get playerId function")
  	}

	handleInput = (e) => {

	  const state = this.state;
	  state[e.currentTarget.name] = e.currentTarget.value
	  this.setState(state)

	}

	

	render(){

		console.log(this.state, "<-- this is state in PlayerRegistration");
		return(
			<div>

			{
				this.state.loggedIn
				?
				<GameContainer getPlayerId={this.getPlayerId}/>
			
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