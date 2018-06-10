import React, { Component } from 'react';
import './style.css';

class EditModal extends Component {
	constructor(){
	 	super();

		this.state = {
			inputVal: ''
		}
	}
	handleInput = (e) => {
		this.setState({inputVal: e.currentTarget.value})
	}
	componentWillRecieveProps(nextProps){
		 
			this.setState({inputVal: nextProps.editedPlayer})
		
	}
	handleISubmit = (e) => {
		this.props.editPlayer(this.state.inputVal, this.props.editedPlayer.id)

	}
	render(){
		
		const cssClass = this.props.modalState ? 'EditModal-Open' : 'EditModal-Closed';
	    return (
	      <div className={cssClass}>
	        <input type="text" value={this.state.inputVal} onChange={this.handleInput}/>
	        <button onClick={this.handleISubmit} >Edit</button>
	      </div>
	      )
  }


}

export default EditModal;