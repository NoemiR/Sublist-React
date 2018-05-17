import React from 'react';
import './style.css'

const Games = ({games, players, available}) => {


	const gamesList = games.map((game, i) => {
		// console.log(game, "<--- This is game in gamesList");
	
		const playerList = players.map((player, i) => {
			console.log(player.id, "<--- this is player.id")
			return <li key={player.id}> </li>

		})


		return <li className="games" key={game.id}>{game.game_time} PM<br/>
				{game.game_date} <br />
				Team {game.team1_id} VS. Team {game.team2_id} <br/>
				<input type="checkbox" /></li>
			
		})

	return (

		<div>


			<h1 className="schedule">Game Schedule</h1>
			<h4 className="schedule">Check the games you are available for!</h4>
		 	{gamesList}

		</div>


	)
}


export default Games;