import React, {Component} from 'react';
import GameContainer from '../GameContainer'
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
			loggedIn: false
		}
	}
	handleSubmit = (e) => {
    	e.preventDefault();
    	this.props.doRegister(this.state.name, this.state.username, this.state.password, this.state.pos, this.state.email, this.state.phone)	
    	this.setState({
    		loggedIn: true
    	})
  	}

	handleInput = (e) => {

	  const state = this.state;
	  state[e.currentTarget.name] = e.currentTarget.value
	  this.setState(state)

	}

	

	render(){
		return(
			<div>

			{
				this.state.loggedIn
				?
				<GameContainer />
			
			:

				<form onSubmit={this.handleSubmit}>
					<input type="text" name="name" placeholder="name" onChange={this.addPlayer}/>
					<input type="text" name="username" placeholder="desired username" value={this.state.username} onChange={this.handleInput}/>
		          	<input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleInput} />
		          	<input type="text" name="pos" placeholder="position"/>
		          	<input type="email" name="email" placeholder="email"/>
		          	<input type="text" name="phone number" placeholder="phone number"/>
					<input type='Submit' value="register"/> <br />


				
				</form>
				}
		
				

			</div>








		)
	}
	
}





export default PlayerRegistration;