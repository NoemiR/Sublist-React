import React, {Component} from 'react';

class CreatePlayer extends Component {
	constructor(){
		super();
		this.state = {
			name: '',
			username: '',
			password: '',
			pos: '',
			email: '',
			phone: '',
			registering: false



		}
	}
	 handleSubmit = (e) => {
    	e.preventDefault();
    	if(this.state.registering) this.props.doRegister(this.state.username, this.state.password)
    	else this.props.doLogin(this.state.username, this.state.password)
  		}

	  handleInput = (e) => {
	    const whichField = e.currentTarget.name
	    if(whichField === "username") this.setState({ username: e.currentTarget.value })
	    else this.setState({password: e.currentTarget.value})
	  }
	  registration = () => {
	    this.setState({
	     registering: true
	    })
	  }
	  loggingIn = () => {
    	this.setState({
      	registering: false
    	})
  	}

	render(){
		return(
			<div>
			"i am the player registration form"
			{this.props.logginError !== '' ? <p className="login-error">{this.props.loginError}</p> : null }
        	<p><span className={this.state.registering ? "current" : null} onClick={this.registration}>Register</span> • <span className={this.state.registering ? null : "current"} onClick={this.loggingIn}>Log in</span></p>
				<form onSubmit={this.handleSubmit}>
					<input type="text" name="name" placeholder="name" onChange={this.updateItem}/>
					<input type="text" name="username" placeholder={this.state.registering ? "desired username" : "username "}value={this.state.username} onChange={this.handleInput} /><br/>
		          	<input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleInput} /><br />
		          	<input type="submit" value={this.state.registering ? "Register" : "Login"} />
		          	<input type="text" name="pos" placeholder="position"/>
		          	<input type="email" name="email" placeholder="email"/>
		          	<input type="text" name="phone number" placeholder="phone number"/>
					<input type='Submit'/>
				</form>

			</div>








		)
	}
	
}







export default CreatePlayer;