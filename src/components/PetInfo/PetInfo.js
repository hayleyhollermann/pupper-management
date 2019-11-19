import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


class HomePage extends Component {

  componentDidMount () {
    console.log('in pet info comp', this.props.match.params)
    let Petid = this.props.match.params.id
    this.props.dispatch({type: 'FETCH_EVENTS', payload: Petid})
    this.props.dispatch({type: 'FETCH_PET', payload: Petid})
  }

  render() {
    return (
      <>
    <Paper >
      <Typography variant="h5" component="h3">
        This Pets name is: {this.props.petInfo.name}
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
  petInfo: state.petsReducer.petInfo
});

export default connect(mapStateToProps)(HomePage);