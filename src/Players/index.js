import React from 'react';

const Players = ({players}) => {
	console.log(players, 'hey')


	const playerList = players.map((player, i) => {
		return (
			<li key={player.id}>{player.name}</li>



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