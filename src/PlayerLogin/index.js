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
    	
	}

	// doLogin = async (username, password) => {
	// 	const responsePromise = await fetch('http://localhost:9292/player/login', {
	// 		method: 'POST',
	// 		credentials: 'include', //you must include this line
	// 		body: JSON.stringify({
	// 			username: username,
	// 			password: password
	// 		})
	// 	})
	// 	const parsedLoginResponse = await responsePromise.json();
	// 		if(parsedLoginResponse.success){
	// 		this.setState({
	// 			loggedIn: true
	// 		})
	// 		this.getPlayers()
	// 		.then((players) => {
	// 			this.setState({players: players.all_players})
	// 		})
	// 		.catch((err) => {
	// 			console.log(err)
	// 		})
	// 		}else{
	// 			this.setState({
	// 				loginError: parsedLoginResponse.message
	// 		})
	// 	}
	// }

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

	    		
	    	
				<form onSubmit={this.handleSubmit} doLogin={this.doLogin}>
					<input type="text" name="username" placeholder="username" value={this.state.username}/>
					<input type="password" name="password" placeholder="password" value={this.state.password}/>
					<button type="Submit">Login</button>

				</form>	
			}
			</div>

	    )
    }
}


export default Login;