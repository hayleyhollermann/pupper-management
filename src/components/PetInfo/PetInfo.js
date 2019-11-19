import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


class HomePage extends Component {


  render() {
    return (
      <>
        <p>Hello</p>
      </>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  pets: state.petsReducer.pets,
  events: state.petEventsReducer.petEvents,
});

export default connect(mapStateToProps)(HomePage);