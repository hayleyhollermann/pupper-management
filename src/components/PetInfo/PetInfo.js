import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


class HomePage extends Component {

  componentDidMount () {
    let Petid = this.props.match.params.id
    this.props.dispatch({type: 'FETCH_EVENTS', payload: Petid})
    this.props.dispatch({type: 'FETCH_PET', payload: Petid})
  }

  render() {
    return (
      <>
    <Paper className="petInfoPaper" elevation='2'>
      <Typography variant="h4" component="h3">
        {this.props.petInfo.name}
      </Typography>
      <Typography component="p">
        Fed: <br />
        Walked: <br />
        Last Outside: <br />
      </Typography>
      <Typography component="p">
        Breed: {this.props.petInfo.breed} <br />
        Weight: {this.props.petInfo.weight} <br />
        Age: {this.props.petInfo.age} <br />
        Vet Name: {this.props.petInfo.vet_name} <br />
        Vet Phone: {this.props.petInfo.vet_phone} <br />
      </Typography>
    </Paper>
    <pre>{JSON.stringify(this.props.petInfo)}</pre>
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