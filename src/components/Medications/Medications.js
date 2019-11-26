import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Moment from 'react-moment';
import 'moment-timezone';
import {Button, Typography, Fab} from '@material-ui/core';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';




class Medications extends Component {

  addNewMedEvent = (medToUpdate) => { // works for pets with medications/events already establoshed but not for new pets
    let timeOfEvent = moment().format()
    console.log(medToUpdate, timeOfEvent)
    this.props.dispatch({type: 'ADD_MED_EVENT', payload: {petId: this.props.petInfo.id, med_type: medToUpdate, time: timeOfEvent}})
  }


  render() {
    return (
      <>
        <Typography component="div">
          Medications: 
            {(this.props.petMeds.length > 1 ? 
              this.props.petMeds.map((med) => 
                <li key={med.med_id}>{med.type}
                    <Button onClick={ () => this.addNewMedEvent(med.med_id)} >
                      Give Med!
                    </Button> <br />
                  {(this.props.events.length > 0) && 
                    (this.props.events.filter(recentEvents => recentEvents.event_type === 'medication').length > 0) ? 
                        this.props.events.filter(recentEvents => recentEvents.med_id === med.med_id).map((med) => 
                           <div key={med.med_id}><Moment format='LLLL'>{med.time}</Moment>
                            <Fab size="small"><FormatListBulletedIcon /></Fab>
                    </div>
                  )
                : 'N/A' }
                </li>
              )
            : 'N/A'
            )}
        </Typography>
      </>
    )
  }
}

const mapStateToProps = state => ({
//   user: state.user,
//   pets: state.petsReducer.pets,
  events: state.petEventsReducer.petEvents,
  petInfo: state.petsReducer.petInfo,
  petMeds: state.petsReducer.petMeds
});

export default connect(mapStateToProps)(Medications);