import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
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
      buttons: true

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
    console.log(this.state, " this.state in App.js")
    return (

      this.state.buttons 
      ?
      <div>


          <h1> Welcome </h1>



            <button id="player" onClick={this.handleClick}>Player App</button>

     

            <button id="team" onClick={this.handleClick}>Team Rep App</button>
    

      </div>

      :
      <div>
      {this.state.whichApp === "team" ? <TeamContainer /> : <PlayerContainer />}

      </div>
    )
  }
}

export default App;







    
