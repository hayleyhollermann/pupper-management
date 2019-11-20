import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button} from '@material-ui/core';
import { withRouter } from 'react-router-dom';



class Settings extends Component {

  componentDidMount() {

  }

  addUserForm = () => {
    this.props.history.push("/add-hh-user")
  }

  switchHouseholdsForm = () => {
      this.props.history.push("/change-household")
  }

  render() {
    return (
      <div>
          <Button onClick={this.addUserForm}>ADD USER TO HOUSEHOLD</Button>
          <Button onClick={this.switchHouseholdsForm}>SWITCH HOUSEHOLDS</Button>

          {/* {/* stretch */}
          {/* <Button>EDIT ACCOUNT INFO</Button> 
          <Button>LOG OUT</Button>  */}

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

export default connect(mapStateToProps)(withRouter(Settings));