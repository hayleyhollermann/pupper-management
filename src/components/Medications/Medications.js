import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import Moment from 'react-moment';
import 'moment-timezone';
import {Button, Typography} from '@material-ui/core';


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
                          <Button>See All</Button>
                    </div>
                  )
                : 'N/A' }
                </li>
              )
            : 'N/A'
            )}
             {/* {(this.props.events.length > 0) && 
                (this.props.events.filter(recentEvents => recentEvents.event_type === 'medication').length > 0) ? 
                  this.props.events.filter(recentEvents => recentEvents.event_type === 'medication').map((med) => 
                    <li key={med.med_id}>{med.type}: <Moment format='LLLL'>{med.time}</Moment>
                      <Button onClick={ () => this.addNewMedEvent(med.med_id)} >
                        Update!
                      </Button>
                      <Button>See All</Button>
                    </li>
                  )
            : 'N/A'  } */}
      </Typography>
      {/* <pre>{JSON.stringify(this.props.petInfo)}</pre> */}
      <pre>{JSON.stringify(this.props.petMeds, null, 2)}</pre>
      <pre>{JSON.stringify(this.props.events.filter(recentEvents => recentEvents.event_type === 'medication'), null, 2)}</pre>
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