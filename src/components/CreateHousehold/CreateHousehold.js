import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button, Input, Paper, Typography} from '@material-ui/core';
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
        <Paper className="paperArea center" elevation={5}>
          <Typography className="centerTitle" variant="h5" component="h2">
            Create a household 
          </Typography>
          <Input placeholder="household name" onChange={this.createHouseholdName}/>
          <Button onClick={this.createHousehold}>Create Household</Button>
        </Paper>
      </div>
    )
  }
}


const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps)(withRouter(CreateHousehold));