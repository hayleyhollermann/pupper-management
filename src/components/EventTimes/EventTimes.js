import React, { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import 'moment-timezone';
import {Paper, Typography, Button} from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


class EventTimes extends Component {

  backToPetInfo = (petId) => {
    console.log('going back');
    this.props.history.push(`/home/${petId}`)
  }

  render() {
    return (
      <div className="paperDiv">
      <Button onClick={ () => this.backToPetInfo(this.props.petInfo.id)}><ArrowBackIcon/></Button>
      {this.props.allTimes ? 
      (
    <Paper className="paperArea" elevation={5}>
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
      (<h1>N/A</h1>)
      }
      {/* <pre>{JSON.stringify(this.props.petInfo, null, 2)}</pre> */}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  allTimes: state.petEventsReducer.allEventTimes,
  petInfo: state.petsReducer.petInfo,
});

export default connect(mapStateToProps)(EventTimes);