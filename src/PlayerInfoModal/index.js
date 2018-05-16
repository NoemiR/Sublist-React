import React, {Component} from 'react';

class PlayerInfoModal extends Component {
	constructor(){
		super()
			this.state = {
				availPlayers: []
			}

	}

	getAvailPlayers = async (e) => {

		const id = e.currentTarget.id
	
		const availplayersJson = await fetch("http://localhost:9292/available/games/players/" + id, {
			credentials: 'include'
		})
		const availPlayers = await availplayersJson.json()
		console.log(availPlayers, "<-- This is availPlayers")
      
	}

	render(){


		return(

			<PlayerInfoModal />


			)
	}


}





export default PlayerInfoModal
