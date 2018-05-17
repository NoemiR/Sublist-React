import React, {Component} from 'react'
import Players from '../Players'
import GameContainer from '../GameContainer'



class Login extends Component {
	constructor() {
	    super();

	    this.state = {
	      username: '',
	      password: '',
	      loggedIn: false
	    }
	}
	handleSubmit = (e) => {
    	e.preventDefault();
    	this.props.doLogin(this.state.username, this.state.password)
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


	    return (
	    	<div>
	    	<h1>Welcome back! </h1>
	    		{
					this.state.loggedIn 
					?
					<GameContainer />
			
					:
	   	
				<form onSubmit={this.handleSubmit}>
					<input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.handleInput}/>
					<input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleInput}/>
					<button type="Submit" value="login">Login</button>

				</form>	
			}
			</div>

	    )
    }
}


export default Login;