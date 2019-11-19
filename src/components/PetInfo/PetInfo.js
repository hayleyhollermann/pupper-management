import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


class HomePage extends Component {

  render() {
    return (
      <>
    <Paper >
      <Typography variant="h5" component="h3">
        This Pets name is: 
      </Typography>
      <Typography component="p">
        Paper can be used to build surface or other elements for your application.
      </Typography>
    </Paper>
    <pre>{JSON.stringify(this.props.events)}</pre>
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