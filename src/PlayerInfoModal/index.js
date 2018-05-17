import React, { Component } from 'react';
import './style.css'

// class PlayerInfoModal extends Component {
// 	constructor(){
// 		super()
// 		this.state = {
// 			availPlayers: []
// 		}
// 	}


// 	componentWillReceiveProps(nextProps){
// 		console.log(nextProps, "this is next props")

// 		if(nextProps.availPlayers === undefined){

// 		} else {
// 			this.setState({availPlayers: nextProps.availPlayers})
// 		}
// 	}


// 	render(){

// 		console.log(this.state, "<-- this.state in PLAYERINFOMODAL");

// 		const playerList = this.props.availPlayers.players.map((availPlayer, i) => {

// 			return <li key={availPlayer.id}> {availPlayer.name} </li>
		
// 		})

// 		return(


// 			<div className="modal">
// 				<h1>Players Available</h1>
// 					<ul>{playerList}</ul>


// 			</div>

// 			)	

// 	}

// }


const PlayerInfoModal = (props) => {
	console.log(props, "<-------- this is props in the PlayerInfoModal()")
	
		let playerList;
		if(props.availPlayers != undefined){
			 playerList = props.availPlayers.players.map((availPlayer, i) => {
				console.log(playerList, 'this is player list in modal first part')
				return <li key={availPlayer.id}> Name: {availPlayer.name} <br />
				Phone: {availPlayer.phone} <br />
				Email: {availPlayer.email} <br />
				Position: {availPlayer.pos}
				</li>
			})		
		} else {
			
		}

	return(

			<div className="modal">

				<h1>Players Available</h1>
					<ul>
						{playerList}
					</ul>
			</div>


			)
	
}



export default PlayerInfoModal
