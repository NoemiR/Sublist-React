import React from 'react';

const Games = ({games}) => {

	const gamesList = games.map((game, i) => {
		// console.log(game, "<--- This is game in gamesList");
		return <li key={game.id}>{game.game_time}<br/>
				{game.game_date}</li>

	})

	return (

		<div>
			<h2>Game Schedule</h2>
		 	<ul>{gamesList}</ul>
		</div>


	)
}


export default Games;