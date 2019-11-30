import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Input, Typography } from '@material-ui/core';
// import swal from 'sweetalert';



class EditMedicationsTable extends Component {

  state = {
    medToAdd: {
      med_name: '',
      quantity: '',
      frequency:''
    }
  }

  medInput = (property, event) => {
    this.setState({
      ...this.state,
      medToAdd: {
        ...this.state.medToAdd,
        [property]: event.target.value
      },
    })
  }

  addNewMed = () => {
    this.props.dispatch({type: 'ADD_MED', payload: {medToAdd: this.state.medToAdd, petId: this.props.match.params.id}})
    this.setState({
        ...this.state,
        medToAdd: {
          med_name: '',
          quantity: '',
          frequency:''
        },
    })
  }

  deleteMed = (id) => {
    console.log('in delete med', id);
    this.props.dispatch({type: 'DELETE_MED', payload: {medId: id, petId: this.props.petInfo.id}})
  }

  render() {
    return (
      <>
        <div>
          <Typography className="centerTitle" variant="h4" component="h3">
            Medications: 
          </Typography>            
            <table> 
              <thead>
                <tr>
                  <th>Med Name</th>
                  <th>Amount</th>
                  <th>Frequency</th>
                  <th> </th>
                </tr>
              </thead>
              <tbody>
                {(this.props.petMeds.length > 0 ? 
                  this.props.petMeds.map((med) => 
                    <tr key={med.med_id}>
                      <td>{med.type}</td>
                      <td>{med.quantity}</td>
                      <td>{med.frequency}</td>
                      <td><Button onClick={ () => this.deleteMed(med.med_id)}>Delete</Button></td>
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
                <tr>
                  <td><Input margin="dense" variant="outlined" placeholder="Med Name" fullWidth={true} value={this.state.medToAdd.med_name}
                    onChange={ (event)=> this.medInput('med_name', event)}/> 
                  </td>
                  <td><Input margin="dense" variant="outlined" placeholder="Amount" fullWidth={true} value={this.state.medToAdd.quantity} 
                    onChange={ (event)=> this.medInput('quantity', event)}/> 
                  </td>
                  <td><Input margin="dense" variant="outlined" placeholder="Frequency" fullWidth={true} value={this.state.medToAdd.frequency}
                    onChange={ (event)=> this.medInput('frequency', event)}/> 
                  </td>
                  <td><Button onClick={this.addNewMed}>Add</Button></td>
                </tr>
              </tbody>
            </table>
          </div>
      </>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  events: state.petEventsReducer.petEvents,
  petInfo: state.petsReducer.petInfo,
  petMeds: state.petsReducer.petMeds
});

export default connect(mapStateToProps)(withRouter(EditMedicationsTable));