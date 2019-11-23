import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button, Input, Paper} from '@material-ui/core';
import { withRouter } from 'react-router-dom';



class AddUserToHousehold extends Component {
  state = {
    userToAdd: ''
  }

  componentDidMount() {

  }

  addUserInput = (event) => {
    this.setState({
      userToAdd: event.target.value
    })
  }

  addUserToHH = () => {
    this.props.dispatch({type: 'ADD_USER_TO_HH', payload: this.state})
    this.props.history.push('/home')
  }

  render() {
    return (
      <div className="paperDiv">
        <Paper className="addUserHousehold" elevation={5}>
          <h3>Enter username of the person you would like to add</h3>
          <Input placeholder="username" onChange={this.addUserInput}/>
          <Button onClick={this.addUserToHH}>Add User</Button>
        </Paper>
        <pre>{JSON.stringify(this.state)}</pre>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(withRouter(AddUserToHousehold));