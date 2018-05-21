import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import PlayerRegistration from './PlayerRegistration'
import PlayerLogin from './PlayerLogin'
import PlayerContainer from './PlayerContainer'
import GameContainer from './GameContainer'
import TeamLoginRegister from './TeamLoginRegister'
import TeamContainer from './TeamContainer'


class App extends Component {

  constructor(){
    super()
    this.state = {
      whichApp: "",
      buttons: true,
      playerId: ""

    }
  }



  handleClick = (e) => {
    console.log(e.currentTarget.id)
    this.setState({
      buttons: false,
      whichApp: e.currentTarget.id
    })
  }

  getPlayerId = async (name, username, password, pos, email, phone) => {
    console.log("this is inside getPlayerId")
      const responsePromise = await fetch('http://localhost:9292/player/register', {
      method: 'POST',
      credentials: 'include', 
      body: JSON.stringify({
        name: name,
        username: username,
        password: password,
        pos: pos,
        email: email,
        phone: phone
      })

    })

    const parsedRegisterResponse = await responsePromise.json();
    console.log(parsedRegisterResponse, "<----this is parsedRegisterResponse")
    console.log(parsedRegisterResponse.player_id, "<--- This is playerid")
    const player_id = parsedRegisterResponse.player_id
      this.setState({playerId: player_id})

      console.log(this.state, "<-----this is state in APP.JS")
      
  }




  render() {
    // console.log(this.state, " <----this.state in App.js")
    return (

      this.state.buttons 
      ?
      <div className="welcome">


            <h1> Play Hard, Get Dirty, Have Fun! </h1>

            <h5>Please register as a Player or a Team Representative to join our league</h5>


            <button className="button" id="player" onClick={this.handleClick}>Player App</button>

            

            <button className="button" id="team" onClick={this.handleClick}>Team Rep App</button>
      

      </div>

      :
      <div>
      {this.state.whichApp === "team" ? <TeamContainer /> : <PlayerContainer />}

      </div>
    )
  }
}

export default App;







    
