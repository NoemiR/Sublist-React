import React from 'react';





const Players = ({players}) => {


	const playerList = players.map((player, i) => {
		return (
			<li key={player.id}>{player.name}</li>



		)
	})
	return (
		<div>
		"i am players"

		<ul>
		{playerList}
		</ul>
		</div>
	)
}


export default Players;