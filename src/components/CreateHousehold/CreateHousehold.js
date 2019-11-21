import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button, Input} from '@material-ui/core';
import { withRouter } from 'react-router-dom';

class CreateHousehold extends Component {
  state = {

  }

  componentDidMount() {

  }

  render() {
    return (
      <div>
        <h3>Create a household</h3>
        <Input placeholder="household name"/>
        <p>Enter username of the person you would like to add (optional)</p>
        <Input placeholder="username"/><br />
        <Button>Create Household</Button>
      </div>
    )
  }
}


const mapStateToProps = state => ({
    user: state.user,
});

export default connect(mapStateToProps)(withRouter(CreateHousehold));