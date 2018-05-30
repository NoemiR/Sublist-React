import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import PlayerContainer from './PlayerContainer'
import TeamContainer from './TeamContainer'


class App extends Component {

  constructor(){
    super()
    this.state = {
      whichApp: "",
      buttons: true,
    
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
            <h4>Please continue as a Player or a Team Representative</h4>

          <div className='form'>  
            <button className="button" id="player" onClick={this.handleClick}>Player</button>

            

            <button className="button" id="team" onClick={this.handleClick}>Team Rep</button>
          </div>

      </div>

      :
      <div>
      {this.state.whichApp === "team" ? <TeamContainer /> : <PlayerContainer />}

      </div>
    )
  }
}

export default App;







    
