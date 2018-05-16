import React from 'react';

const Players = ({players, openModal}) => {
	console.log(players, 'hey')


	const playerList = players.map((player, i) => {
		return (
			<li key={player.id}>{player.name}
			<button onClick={openModal}>Edit</button>
			</li>



		)
	})
	return (
		<div>
	

		<ul>
		{playerList}
		</ul>
		</div>
	)
}


export default Players;