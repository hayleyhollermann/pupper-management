import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Moment from 'react-moment';
import 'moment-timezone';
import {Button, Paper, Typography} from '@material-ui/core';


class HomePage extends Component {

  componentDidMount () {    
    let petId = this.props.match.params.id
    console.log('petId =');
    this.props.dispatch({type: 'FETCH_EVENTS', payload: petId})
    this.props.dispatch({type: 'FETCH_PET', payload: petId})
  }

  addNewEvent = (eventToUpdate) => {
    let timeOfEvent = moment().format()
    console.log(eventToUpdate, timeOfEvent)
    this.props.dispatch({type: 'ADD_EVENT', payload: {petId: this.props.petInfo.id, event_type: eventToUpdate, time: timeOfEvent}})
  }

  render() {
    return (
      <div className="paperDiv">
      {this.props.petInfo ? 
      (
    <Paper className="petInfoPaper" elevation={5}>
      <Typography variant="h4" component="h3">
        {this.props.petInfo.name}
      </Typography>
      <Typography component="p">
        Fed: 
            {(this.props.events.length > 0) && 
                (this.props.events.filter(recentEvents => recentEvents.event_type === 'fed').length > 0) ? 
                <Moment format='LLLL'>
                    {this.props.events.filter(recentEvents => recentEvents.event_type === 'fed')[0].time}
                </Moment>
            : 'N/A'  } 
            <Button onClick={ () => this.addNewEvent('fed')} >
                Update!
            </Button>
            <Button>See All</Button>
            <br />
        Walked: 
            {(this.props.events.length > 0) && 
                (this.props.events.filter(recentEvents => recentEvents.event_type === 'walked').length > 0) ?  
                <Moment format='LLLL'>
                    {this.props.events.filter(recentEvents => recentEvents.event_type === 'walked')[0].time}
                </Moment>
            : 'N/A'  } 
            <Button onClick={ () => this.addNewEvent('walked')} >
                Update!
            </Button>
            <Button>See All</Button>
            <br />
        Last Outside: 
            {(this.props.events.length > 0) && 
                (this.props.events.filter(recentEvents => recentEvents.event_type === 'last outside').length > 0) ? 
                <Moment format='LLLL'>
                    {this.props.events.filter(recentEvents => recentEvents.event_type === 'last outside')[0].time}
                </Moment>
            : 'N/A'  } 
            <Button onClick={ () => this.addNewEvent('last outside')} >
                Update!
            </Button>
            <Button>See All</Button>
            <br />
      </Typography>
      <Typography component="p">
        Breed: {this.props.petInfo.breed} <br />
        Weight: {this.props.petInfo.weight} <br />
        Age: {this.props.petInfo.age} <br />
        Vet Name: {
            this.props.petInfo.vet_name ? this.props.petInfo.vet_name
            : 'No vet name on file'
        } <br />
        Vet Phone: {
            this.props.petInfo.vet_phone ? this.props.petInfo.vet_phone
            : 'No vet phone on file'        
        } <br />
      </Typography>
    </Paper>) :
      (<h1>this is not your pet!</h1>)
      }
      <pre>{JSON.stringify(this.props.petInfo)}</pre>
      </div>
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