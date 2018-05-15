import React from 'react';

const PlayerGames = ({games}) => {

	const playergamesList = games.map((game, i) => {
		// console.log(game, "<--- This is game in gamesList");
		return <li key={game.id}>{game.game_time} <br/>
				{game.game_date} PM<br/>
				{game.team_id} <br/>
				{game.team1_id} VS. {game.team2_id}
				<button>View Players</button></li>

	})

	return (

		<div>
		<h2>Game Schedule For Player Games</h2>
		 	<ul>{playergamesList}</ul>
		</div>


	)
}


export default PlayerGames;