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
      super();
      this.state = {
        playerLogin: '',
        teamLogin: ''
      }
    }




  render() {
    return (
      <div className="App">
     <div>
          {this.state.playerLogin ? <button>Player</button>
        <PlayerRegistration/> <PlayerLogin/>  <button>Team Rep</button>}</div>:<div>

      
        <TeamLoginRegister />

        <TeamContainer 

       

      </div>
      </div>
    );
  }
}

export default App;







    <p><span className={this.state.playerLogin ? "current" : null} onClick={this.registration}>Register</span> • <span className={this.state.registering ? null : "current"} onClick={this.loggingIn}>Log in</span></p>

