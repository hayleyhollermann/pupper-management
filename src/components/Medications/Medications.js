import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment-timezone';




class Medications extends Component {

  addNewMedEvent = (medToUpdate) => { // works for pets with medications/events already establoshed but not for new pets
    let timeOfEvent = moment().format()
    console.log(medToUpdate, timeOfEvent)
    this.props.dispatch({type: 'ADD_MED_EVENT', payload: {petId: this.props.petInfo.id, med_type: medToUpdate, time: timeOfEvent}})
  }


  render() {
    return (
      <>
        <div>
          <h3>Medications: </h3>
            <table> 
              <thead>
                <tr>
                  <th>Med Name</th>
                  <th>Amount</th>
                  <th>Frequency</th>
                </tr>
              </thead>
              <tbody>
                {(this.props.petMeds.length > 0 ? 
                  this.props.petMeds.map((med) => 
                    <tr key={med.med_id}>
                      <td>{med.type}</td>
                      <td>{med.quantity}</td>
                      <td>{med.frequency}</td>
                    </tr>
                  )
                : 
                  <tr>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                    <td> </td>
                  </tr>
                )}
              </tbody>
            </table>
        </div>
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