import React from 'react';
import './style.css'


const PlayerInfoModal = (props) => {
	console.log(props, "<-------- this is props in the PlayerInfoModal()")
	
		let playerList;
		if(props.availPlayers != undefined){
			 playerList = props.availPlayers.players.map((availPlayer, i) => {
				console.log(playerList, 'this is player list in modal first part')
				return <li className="players" key={availPlayer.id}> Name: {availPlayer.name} <br />
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
