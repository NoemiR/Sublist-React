import React, {Component} from 'react';
import PlayerLogin from '../PlayerLogin'

class CreatePlayer extends Component {
	constructor(){
		super();
		this.state = {
			name: '',
			username: '',
			password: '',
			pos: '',
			email: '',
			phone: ''
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
	

	render(){
		return(
			<div>
			"i am the player registration form"

				<form onSubmit={this.handleSubmit}>
					<input type="text" name="name" placeholder="name" onChange={this.addPlayer}/>
					<input type="text" name="username" placeholder="desired username" value={this.state.username} onChange={this.handleInput}/>
		          	<input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleInput} />
		          	<input type="text" name="pos" placeholder="position"/>
		          	<input type="email" name="email" placeholder="email"/>
		          	<input type="text" name="phone number" placeholder="phone number"/>
					<input type='Submit' value="register"/>
				</form>

				<PlayerLogin />
			</div>

		)
	}
	
}







export default CreatePlayer;