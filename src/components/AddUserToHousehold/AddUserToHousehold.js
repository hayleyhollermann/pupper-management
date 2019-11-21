import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button, Input} from '@material-ui/core';
import { withRouter } from 'react-router-dom';



class AddUserToHousehold extends Component {
  state = {

  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <h3>Enter username of the person you would like to add</h3>
        <Input placeholder="username"/>
        <Button>Add User</Button>
      </div>
    )
  }
}


const mapStateToProps = state => ({
  user: state.user,
});

export default connect(mapStateToProps)(withRouter(AddUserToHousehold));