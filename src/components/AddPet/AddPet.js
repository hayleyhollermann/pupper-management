import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, TextField } from '@material-ui/core';
import swal from 'sweetalert';



class AddPet extends Component {

  state = {
      newPet: {
          householdId: this.props.match.params.id,
          name: '',
          breed: '',
          weight: '',
          age: '',
          vetName: '',
          vetPhone: '',
          medName: '',
          medAmount: '',
          medFreq: ''
      },
      showPt2: false
  }

  editNewPet = (property, event) => {
      this.setState({
          ...this.state,
          newPet: {
            ...this.state.newPet,
            [property]: event.target.value
          },
      })
  }

  addPetPart2 = () => {
    this.setState({
        ...this.state,
        showPt2: !this.state.showPt2
    })
  }

  SumbitPet = () => {
    this.props.dispatch({type: 'ADD_PET', payload: this.state.newPet});
    swal("Done!", `Added ${this.state.newPet.name} to your household!`, "success")
    .then(() => {
      this.props.history.push('/home');
    });
  }

  render() {
    return (
      <>
        { !this.state.showPt2 ? 
            <div>
              <h1>General Info</h1>
              <TextField margin="dense" variant="outlined" label="Name" fullWidth={true} value={this.state.newPet.name}
                onChange={ (event)=> this.editNewPet('name', event)}
              /> 
              <TextField margin="dense" variant="outlined" label="Breed" fullWidth={true} value={this.state.newPet.breed}
                onChange={ (event)=> this.editNewPet('breed', event)}
              /> 
              <TextField margin="dense" variant="outlined" label="Weight (lbs)" fullWidth={true} value={this.state.newPet.weight}
                onChange={ (event)=> this.editNewPet('weight', event)}
              />  
              <TextField margin="dense" variant="outlined" label="Age (years)" fullWidth={true} value={this.state.newPet.age}
                onChange={ (event)=> this.editNewPet('age', event)}
              /> 
              <Button onClick={this.addPetPart2}>NEXT</Button>
            </div>
          : 
          <div>
             <h1>Vet Info</h1>
             <TextField margin="dense" variant="outlined" label="Vet Name" fullWidth={true} value={this.state.newPet.vetName}
                onChange={ (event)=> this.editNewPet('vetName', event)}
              />  
             <TextField margin="dense" variant="outlined" label="Vet Phone" fullWidth={true} value={this.state.newPet.vetPhone}
                onChange={ (event)=> this.editNewPet('vetPhone', event)}
              />  
             <h1>Medications</h1>
             <TextField margin="dense" variant="outlined" label="Medication Name" fullWidth={true} value={this.state.newPet.medName}
                onChange={ (event)=> this.editNewPet('medName', event)}
              />  
             <TextField margin="dense" variant="outlined" label="Amount" fullWidth={true} value={this.state.newPet.medAmount}
                onChange={ (event)=> this.editNewPet('medAmount', event)}
              />  
             <TextField margin="dense" variant="outlined" label="Frequency" fullWidth={true} value={this.state.newPet.medFreq}
                onChange={ (event)=> this.editNewPet('medFreq', event)}
              /> 
             <Button onClick={this.SumbitPet}>Submit</Button>
          </div>
        }
      </>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  pets: state.petsReducer.pets,
  events: state.petEventsReducer.petEvents,
});

export default connect(mapStateToProps)(withRouter(AddPet));