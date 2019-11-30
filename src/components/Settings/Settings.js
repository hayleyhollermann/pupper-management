import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Paper } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import HomeIcon from '@material-ui/icons/Home';



class Settings extends Component {

  addUserForm = () => {
    this.props.history.push("/add-hh-user")
  }

  switchHouseholdsForm = () => {
      this.props.history.push("/change-household")
  }

  render() {
    return (
      <div className="paperDiv">    
        <Paper className="paperArea centerTitle" elevation={5}>
          <Button variant="contained" onClick={this.addUserForm}><PersonAddIcon/>  ADD USER TO HOUSEHOLD</Button><br/><br/>
          <Button variant="contained" onClick={this.switchHouseholdsForm}><HomeIcon/> SWITCH HOUSEHOLDS</Button>
          {/* {/* stretch */}
          {/* <Button>EDIT ACCOUNT INFO</Button> 
          <Button>LOG OUT</Button>  */}
      </Paper>
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