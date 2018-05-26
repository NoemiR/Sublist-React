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



  render() {
    // console.log(this.state, " <----this.state in App.js")
    return (

      this.state.buttons 
      ?
      <div className="welcome">

            <h1>Welcome to Sublist</h1>
            <h5>Please register as a Player or a Team Representative to join</h5>


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







    
