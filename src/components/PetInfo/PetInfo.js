import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Moment from 'react-moment';
import 'moment-timezone';
import Medications from '../Medications/Medications'
import {Button, Paper, Typography, Fab} from '@material-ui/core';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';


class HomePage extends Component {

  componentDidMount () {    
    let petId = this.props.match.params.id
    this.props.dispatch({type: 'FETCH_EVENTS', payload: petId})
    this.props.dispatch({type: 'FETCH_PET', payload: petId})
    this.props.dispatch({type: 'FETCH_MEDS', payload: petId})
  }

  // add new event, sends to addPetEvent Saga
  addNewEvent = (eventToUpdate) => {
    let timeOfEvent = moment().format()
    console.log(eventToUpdate, timeOfEvent)
    this.props.dispatch({type: 'ADD_EVENT', payload: {petId: this.props.petInfo.id, event_type: eventToUpdate, time: timeOfEvent}})
  }

  editPetInfo = () => {
    this.props.history.push(`/edit-pet-info/${this.props.match.params.id}`)
  }

  // fetches 5 most recent times for specific event
  seeAllEvent = (eventToGet) => {
    this.props.dispatch({type: 'FETCH_ALL_TIMES', payload: {petId: this.props.petInfo.id, eventType: eventToGet}})
    this.props.history.push(`/event-times`)
  }

  render() {
    return (
      <div className="paperDiv">
      {this.props.petInfo ? 
      (
    <Paper className="paperArea" elevation={5}>
      <Typography variant="h4" component="h2">
        {this.props.petInfo.name} 
          {this.props.petInfo && this.props.petInfo.is_admin ? 
            <Button onClick={this.editPetInfo}>Edit Pet Info</Button>
            :
            ''
          }
      </Typography>
      <Typography variant="h5" component="h3">
        Fed: 
      </Typography>
      <Typography component="p">
            {(this.props.events.length > 0) && 
                (this.props.events.filter(recentEvents => recentEvents.event_type === 'fed').length > 0) ? 
                <Moment format='LLLL'>
                    {this.props.events.filter(recentEvents => recentEvents.event_type === 'fed')[0].time}
                </Moment>
            : 'N/A'  } 
            <Button onClick={ () => this.addNewEvent('fed')} >
                Update!
            </Button>
            <Fab size="small" onClick={ () => this.seeAllEvent('fed')}><FormatListBulletedIcon /></Fab>
            <br />
      </Typography>
      <Typography variant="h5" component="h3">
        Walked: 
      </Typography>
      <Typography component="p">
            {(this.props.events.length > 0) && 
                (this.props.events.filter(recentEvents => recentEvents.event_type === 'walked').length > 0) ?  
                <Moment format='LLLL'>
                    {this.props.events.filter(recentEvents => recentEvents.event_type === 'walked')[0].time}
                </Moment>
            : 'N/A'  } 
            <Button onClick={ () => this.addNewEvent('walked')} >
                Update!
            </Button>
            <Fab size="small" onClick={ () => this.seeAllEvent('walked')}><FormatListBulletedIcon /></Fab>
            <br />
      </Typography>
      <Typography variant="h5" component="h3">
        Last Outside: 
      </Typography>
      <Typography component="p">
            {(this.props.events.length > 0) && 
                (this.props.events.filter(recentEvents => recentEvents.event_type === 'last outside').length > 0) ? 
                <Moment format='LLLL'>
                    {this.props.events.filter(recentEvents => recentEvents.event_type === 'last outside')[0].time}
                </Moment>
            : 'N/A'  } 
            <Button onClick={ () => this.addNewEvent('last outside')} >
                Update!
            </Button>
            <Fab size="small" onClick={ () => this.seeAllEvent('last outside')}><FormatListBulletedIcon /></Fab>
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
      <Medications />
    </Paper>) :
      (<h1>this is not your pet!</h1>)
      }
      <pre>{JSON.stringify(this.props.allTimes, null, 2)}</pre>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  events: state.petEventsReducer.petEvents,
  petInfo: state.petsReducer.petInfo,
  petMeds: state.petsReducer.petMeds,
});

export default connect(mapStateToProps)(HomePage);