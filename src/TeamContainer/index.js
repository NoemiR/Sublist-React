import React, { Component } from 'react';
import TeamLoginRegister from '../TeamLoginRegister'
import Players from '../Players'
import Games from '../Games'
import PlayerGames from '../PlayerGames'
import PlayerRegistration from '../PlayerRegistration'
import PlayerInfoModal from '../PlayerInfoModal'

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
    componentDidMount(){
        // this.getPlayers()
        // .then((players) => {
        //  this.setState({players: players.all_players})
        // })
        // .catch((err) => {
        //  console.log(err)
        // })
    
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
    
        const availplayersJson = await fetch("http://localhost:9292/available/games/players/" + id, {
            credentials: 'include'
        })
        const availPlayers = await availplayersJson.json()
        console.log(availPlayers, "<-- This is availPlayers")
      
    }
    openModal = () => {
        
    }
    doLogin = async (username, password) => {
            console.log("You are trying to Log In ");
            const resolvedLoginPromise = await fetch('http://localhost:9292/team/login', {
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
        
            const resolvedRegisterPromise = await fetch('http://localhost:9292/team/register', {
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
        const logoutResponsePromise = await fetch('http://localhost:9292/team/logout', {
            credentials: 'include', 
        })
        this.setState({loggedIn: false})
    }


    render(){
        console.log(this.state, "<--- This is this.state in render in Team Container")
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