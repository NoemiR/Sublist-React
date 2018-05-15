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
			register: false
		}
	}
	handleSubmit = (e) => {
    	e.preventDefault();
    	console.log('haye')
    	if(this.state.register){
    		this.props.doRegister(this.state.name, this.state.username, this.state.password, this.state.pos, this.state.email, this.state.phone)
    	}else{
    		this.props.doLogin(this.state.username, this.state.password)
    	}

   	  	
  	}

	handleInput = (e) => {
	  const whichField = e.currentTarget.name
	  if(whichField === "username") this.setState({ username: e.currentTarget.value })
	  else this.setState({password: e.currentTarget.value})
	}
	registration = () => {
	    this.setState({
	     	register: true
	    })
	}
	loggingIn = () => {
    	this.setState({
      		register: false
    	})
  	}

	render(){
		return(
			<div>
			"i am the player registration form"



			{this.props.logginError !== '' ? <p className="login-error">{this.props.loginError}</p> : null }
        	<p><span className={this.state.registering ? "current" : null} onClick={this.registration}>Register</span> •
        	 <span className={this.state.registering ? null : "current"} onClick={this.loggingIn}>Log in</span></p>




				<form onSubmit={this.handleSubmit}>

					<input type="text" name="name" placeholder="name" onChange={this.addPlayer}/>
					<input type="text" name="username" placeholder={this.state.register ? "desired username" : "username "}value={this.state.username} onChange={this.handleInput} /><br/>
		          	<input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleInput} /><br />
		          	<input type="submit" value={this.state.register ? "Register" : "Login"} />
		          	<input type="text" name="pos" placeholder="position"/>
		          	<input type="email" name="email" placeholder="email"/>
		          	<input type="text" name="phone number" placeholder="phone number"/>
					<input type='Submit' value={this.state.registering ? "Register" : "Login"}/>
				</form>





				<form onSubmit={this.handleSubmit}>
					<input type="text" name="username" placeholder="username"/>
					<input type="password" name="password" placeholder="password" value={this.state.password}/>

				</form>
				

			</div>








		)
	}
	
}







export default CreatePlayer;