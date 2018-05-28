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
			backButton: true

		}
	}
	handleSubmit = (e) => {
    	e.preventDefault();
    	this.props.doRegister(this.state.name, this.state.username, this.state.password, this.state.pos, this.state.email, this.state.phone)	
    
  	}


	handleInput = (e) => {

	  const state = this.state;
	  state[e.currentTarget.name] = e.currentTarget.value
	  this.setState(state)

	}

	handleBackButton = (e) => {
		this.setState({ backButton: false} )
	}

	

	render(){

		// console.log(this.state, "<-- this is state in PlayerRegistration");
	
		return(

			this.state.backButton 
     		 ?

			<div>	
				<button onClick={this.handleBackButton} className="back-button">&#8249;</button>
				<h2>Please register before you select your available games</h2>
				<div className="form">
					<form onSubmit={this.handleSubmit}>
						<input type="text" name="name" placeholder="name" onChange={this.handleInput}/><br/>
						<input type="text" name="username" placeholder="desired username" value={this.state.username} onChange={this.handleInput}/><br/>
			          	<input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleInput} /><br/>
			          	<input type="text" name="pos" placeholder="position" onChange={this.handleInput} /><br/>
			          	<input type="email" name="email" placeholder="email" onChange={this.handleInput} /><br/>
			          	<input type="text" name="phone" placeholder="phone" onChange={this.handleInput} /><br/>

						<button>Register</button>
					
					</form>
				</div>
			</div>
			:
			<div>
				<PlayerContainer />
			</div>
			

		)
	}
	
}





export default PlayerRegistration;