import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button, Input} from '@material-ui/core';
import { withRouter } from 'react-router-dom';



class ChangeHousehold extends Component {
  state = {

  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <h3>Which household would you like to switch to?</h3>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  user: state.user,
  usersHouseholds: state.usersHouseholds.usersHouseholds, 
  pets: state.petsReducer.pets,
  events: state.petEventsReducer.petEvents,
});

export default connect(mapStateToProps)(withRouter(ChangeHousehold));