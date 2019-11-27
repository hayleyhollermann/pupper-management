import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Moment from 'react-moment';
import 'moment-timezone';
import {Paper, Typography} from '@material-ui/core';


class EventTimes extends Component {

  render() {
    return (
      <div className="paperDiv">
      {this.props.allTimes ? 
      (
    <Paper className="allTimesPaper" elevation={5}>
      <Typography variant="h4" component="h3">
        {this.props.allTimes && this.props.allTimes.length > 0 ? 
          this.props.allTimes[0].type 
        : ''}
      </Typography>
      <Typography variant="body1" component="ul">
        {this.props.allTimes && this.props.allTimes.length > 0 ? 
          this.props.allTimes.map((eventTime) => 
            <li key={eventTime.id}>
              <Moment format='LLLL'>{eventTime.time}</Moment>
            </li>
          )
        : ''} 
      </Typography>
    </Paper>
        ) :
      (<h1>this is not your pet!</h1>)
      }
      <pre>{JSON.stringify(this.props.allTimes, null, 2)}</pre>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  pets: state.petsReducer.pets,
  events: state.petEventsReducer.petEvents,
  petInfo: state.petsReducer.petInfo,
  petMeds: state.petsReducer.petMeds,
  allTimes: state.petEventsReducer.allEventTimes
});

export default connect(mapStateToProps)(EventTimes);