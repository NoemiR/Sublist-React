import React, { Component } from 'react';
import TeamLoginRegister from '../TeamLoginRegister'
// import Players from '../Players'
import PlayerGames from '../PlayerGames'



class TeamContainer extends Component {
    constructor(){
        super()
        this.state = {
            players: [],
            availPlayers: [],
            games: [],
            loginError: "",
            loggedIn: false
        }
    }
    getGames = async () => {
        // console.log("This is before the fetch api call")
        const gamesJson = await fetch("http://localhost:9292/games", {
            credentials: 'include'
        }); 
          const games = await gamesJson.json()
          console.log(games, "<-- This is games in getGames Function");
          return games
        
    }
    getAvailPlayers = async (e) => {
        const id = e.currentTarget.id
    
        const availplayersJson = await fetch("https://sublist.herokuapp.com/available/games/players/" + id, {
            credentials: 'include'
        })
        const availPlayers = await availplayersJson.json()
        console.log(availPlayers, "<-- This is availPlayers")
      
    }
    openModal = () => {
        
    }
    doLogin = async (username, password) => {
            console.log("You are trying to Log In ");
            const resolvedLoginPromise = await fetch('https://sublist.herokuapp.com/team/login', {
              method: "POST",
              credentials: 'include', 
              body: JSON.stringify({
                username: username,
                password: password
          })
        })
        const parsedLoginResponse = await resolvedLoginPromise.json()
        console.log("heres what happened when you tried to login")
        console.log(parsedLoginResponse)
        if(parsedLoginResponse.success) {
            this.setState({
                loggedIn: true
            })
            this.getGames()
              .then((games) => {
                console.log(games)
                this.setState({games: games.all_games})
              })
              .catch((err) => {
                console.log(err)
              })
        } else {
            this.setState({
                loginError: parsedLoginResponse.message
             })
        }
    }
    doRegister = async (username, password) => {
        
            const resolvedRegisterPromise = await fetch('https://sublist.herokuapp.com/team/register', {
              method: "POST",
              credentials: 'include', 
              body: JSON.stringify({
                username: username,
                password: password
          })
        })
            const parsedRegisterResponse = await resolvedRegisterPromise.json()
            console.log("heres what happened when you tried to Register")
            console.log(parsedRegisterResponse)
            if(parsedRegisterResponse.success) {
                this.setState({
                    loggedIn: true
                })
                    this.getGames()
                    .then((games) => {
                    this.setState({games: games.all_games})
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            } 
    }

    doLogoutTeam = async () => {
        const logoutResponsePromise = await fetch('https://sublist.herokuapp.com/team/logout', {
            credentials: 'include', 
        })
        this.setState({loggedIn: false})
    }


    render(){
        return(
            <div>
                {
                    this.state.loggedIn 
                    ?
                    <div>
                        <PlayerGames doLogoutTeam={this.doLogoutTeam} games={this.state.games} getGames={this.getGames} getAvailPlayers={this.getAvailPlayers} />  
                    </div>
                    :   
                    <TeamLoginRegister doLogin={this.doLogin} doRegister={this.doRegister} loginError={this.state.loginError} />
                }
            </div>
        )
    }
}
export default TeamContainer