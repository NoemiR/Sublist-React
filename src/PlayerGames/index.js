import React from 'react';

const PlayerGames = ({games, getAvailPlayers}) => {

	const playergamesList = games.map((game, i) => {
		// console.log(game, "<--- This is game in gamesList");
		return <li key={game.id}>{game.game_date}  <br/>
				{game.game_time} PM <br/>
				{game.team_id} <br/>
				Team {game.team1_id} VS. Team {game.team2_id} <br/>
				<button id={game.id} onClick={getAvailPlayers}>View Players</button></li>

	})

	return (

		<div>
			<h2>Game Schedule--Click to see who's available for a certain game</h2>
		 	<ul>{playergamesList}</ul>
		</div>


	)
}


export default PlayerGames;