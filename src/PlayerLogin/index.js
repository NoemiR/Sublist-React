import React, {Component} from 'react'
import Players from '../Players'
import GameContainer from '../GameContainer'
import PlayerContainer from '../PlayerContainer'
import './style.css'



class Login extends Component {
	constructor() {
	    super();

	    this.state = {
	      username: '',
	      password: '',
	      backButtonLogin: true
	    }
	}
	handleSubmit = (e) => {
    	e.preventDefault();
    	this.props.doLogin(this.state.username, this.state.password)
    	
	}

	handleInput = (e) => {

	  const state = this.state;
	  state[e.currentTarget.name] = e.currentTarget.value
	  this.setState(state)

	}

	handleBackButtonLogin = (e) => {
		this.setState({ backButtonLogin: false} )
	}


  	render(){


	    return (
	    	this.state.backButtonLogin
     		 ?

		    	<div>
		    		<button onClick={this.handleBackButtonLogin} className="back-button-login">&#8249;</button>
		    		<h1>Welcome back! </h1>
		    	
		    		{this.props.loginError != '' ? <p className="login-error">{this.props.loginError}</p> : null }
					<form className="form" onSubmit={this.handleSubmit}> <br/>
						<input type="text" name="username" placeholder="username" value={this.state.username} onChange={this.handleInput}/>
						<input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleInput}/>
						<button type="Submit" value="login">Login</button>

					</form>	
					
				</div>
				:
				<div>
					<PlayerContainer />
				</div>

	    )
    }
}


export default Login;