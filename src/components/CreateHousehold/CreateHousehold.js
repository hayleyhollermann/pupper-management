import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button, Input, Paper} from '@material-ui/core';
import { withRouter } from 'react-router-dom';

class CreateHousehold extends Component {
  state = {
    householdName: ''
  }

  createHouseholdName = (event) => {
    this.setState({
      householdName: event.target.value
    })
  }

  createHousehold = () => {
    console.log('in createHousehold adding new:', this.state);
    this.props.dispatch({type: 'NEW_HOUSEHOLD', payload: this.state})
    this.props.history.push('/change-household')
  }

  render() {
    return (
      <div className="paperDiv">
        <Paper className="createHousehold" elevation={5}>
          <h3>Create a household</h3>
          <Input placeholder="household name" onChange={this.createHouseholdName}/>
          {/* <p>Enter username of the person you would like to add (optional)</p>
          <Input placeholder="username"/><br /> */}
          <Button onClick={this.createHousehold}>Create Household</Button>
          <pre>{JSON.stringify(this.state)}</pre>
        </Paper>
      </div>
    )
  }
}


const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps)(withRouter(CreateHousehold));