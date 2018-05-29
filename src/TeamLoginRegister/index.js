import React, { Component } from 'react'
import './style.css'

class TeamLoginRegister extends Component {
	constructor(){
		super()

		this.state = {
			username: "",
			password: "",
			registering: false,
		

		}	

	}
	handleSubmit = (e) => {
		console.log("This is in Handle Submit");
		e.preventDefault();
		if(this.state.registering) 
			this.props.doRegister(this.state.username, this.state.password)
		else 
			this.props.doLogin(this.state.username, this.state.password)
	}
	handleInput = (e) => {
		console.log("This is handle input")
		const whichField = e.currentTarget.name
		if(whichField === "username") this.setState({username: e.currentTarget.value})
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
	handleBackButton = (e) => {
		this.setState({ backButtonLogin: false} )
	}

	render(){

		return (

			<div className="team-form">
				<h1>Short on players?</h1> 
				<h2>Check out who is available!</h2>
				{this.props.loginError != '' ? <p className="login-error">{this.props.loginError}</p> : null }
				<p><span className={ this.state.registering ? "current" : null }onClick={this.registration}>Register</span> • <span className={this.state.registering ? null : "current" }onClick={this.loggingIn}>Login</span></p>
				<form onSubmit={this.handleSubmit} > 
				
				<input type="text" name="username" placeholder="username" value={this.state.username } onChange={this.handleInput}/> <br />
				<input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleInput}/> <br />

				<input type="submit" value={this.state.registering ? "Register" : "Login"} />
				</form>
			</div>



			)



	}
}

export default TeamLoginRegister