import React, {Component} from 'react'




class Login extends Component {
	constructor() {
	    super();

	    this.state = {
	      username: '',
	      password: '',
	      loggeIn: false
	    }
	}
	handleSubmit = (e) => {
    	e.preventDefault();
    	this.props.doLogin(this.state.username, this.state.password)	
    	
	}

	loggingIn = () => {
    	this.setState({
      		register: false
    	})
  	}
  	render(){


	    return (

			<form onSubmit={this.handleSubmit}>
				<input type="text" name="username" placeholder="username" value={this.state.username}/>
				<input type="password" name="password" placeholder="password" value={this.state.password}/>
				<button type="Submit">Login</button>

			</form>						

	    )
    }
}


export default Login;