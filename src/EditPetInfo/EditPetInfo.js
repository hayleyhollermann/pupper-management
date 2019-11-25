import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Input } from '@material-ui/core';
// import swal from 'sweetalert';



class EditPetInfo extends Component {

  state = {
    editInfo: {
      weight: '',
      age: '',
      vetName: '',
      vetPhone: '',
    },
    medToAdd: {
      med_name: '',
      quantity: '',
      frequency:''
    }
  }

  componentDidMount () {
    let petId = this.props.match.params.id;
    this.props.dispatch({type: 'FETCH_PET', payload: petId})
    this.props.dispatch({type: 'FETCH_MEDS', payload: petId})
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


  sumbitPet = () => {
    // this.props.dispatch({type: 'ADD_PET', payload: this.state.newPet});
    // swal("Done!", `Added ${this.state.newPet.name} to your household!`, "success")
    // .then(() => {
    //   this.props.history.push('/home');
    // });
  }

  render() {
    return (
      <>
        <div>
          <h1>General Info</h1>
            <p>Weight:</p>
            {(this.props.petInfo.weight) ? <span>{this.props.petInfo.weight}lbs <Button>Edit</Button></span> 
              : ''
            }
            <p>Age:</p>
            {(this.props.petInfo.age) ? <span>{this.props.petInfo.age} years <Button>Edit</Button></span> 
              : ''
            }
            <p>Vet Info:</p>
            {(this.props.petInfo.vetName && this.props.petInfo.vetPhone) ? 
                <span>
                    Vet Name: {this.props.petInfo.vetName} <Button>Edit</Button><br/>
                    Vet Phone: {this.props.petInfo.vetPhone} <Button>Edit</Button>
                </span> 
              : <Button>Add Vet Info</Button>
            }
            <p>Medications: </p>
            <table> 
              <thead>
                <tr>
                  <th>Med Name</th>
                  <th>Amount</th>
                  <th>Frequency</th>
                  <th>Remove</th>
                </tr>
              </thead>
              <tbody>
                {(this.props.petMeds.length > 1 ? 
                  this.props.petMeds.map((med) => 
                    <tr key={med.med_id}>
                      <td>{med.type}</td>
                      <td>{med.quantity}</td>
                      <td>{med.frequency}</td>
                      <td><Button>Delete</Button></td>
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
{/*             
            <TextField margin="dense" variant="outlined" label="Weight (lbs)" fullWidth={true} value={this.state.editInfo.weight}
              onChange={ (event)=> this.editNewPet('weight', event)}
            />  
            <TextField margin="dense" variant="outlined" label="Age (years)" fullWidth={true} value={this.state.editInfo.age}
              onChange={ (event)=> this.editNewPet('age', event)}
            /> 
            <h1>Vet Info</h1>
            <TextField margin="dense" variant="outlined" label="Vet Name" fullWidth={true} value={this.state.editInfo.vetName}
              onChange={ (event)=> this.editNewPet('vetName', event)}
            />  
            <TextField margin="dense" variant="outlined" label="Vet Phone" fullWidth={true} value={this.state.editInfo.vetPhone}
              onChange={ (event)=> this.editNewPet('vetPhone', event)}
            />  */}
            <Button onClick={this.sumbitPet}>Submit Changes</Button>
            <pre>{JSON.stringify(this.state, null, 2)}</pre>
            <pre>{JSON.stringify(this.props.petInfo, null, 2)}</pre>
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

export default connect(mapStateToProps)(withRouter(EditPetInfo));