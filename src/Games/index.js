import React from 'react';
import GameContainer from '../GameContainer'
import './style.css'

const Games = (props) => {

	const gamesList = props.games.map((game, i) => {
		
		return( 
			<li className="games" data-gid={game.id} key={game.id}>{game.game_time} PM<br/>
				{game.game_date} <br />
				Team {game.team1_id} VS. Team {game.team2_id} <br/>
				<input type="checkbox" id='checkbox' name="checkbox" onChange={props.handleCheck} />
			</li>
		)

	})

	return (

		<div>

			<form>
				<h1 className="schedule">Game Schedule</h1>
				<h4 className="schedule">Check the games you are available for!</h4>
			 	<ul>{gamesList}</ul>
			</form>	

		</div>

	)
}


export default Games;