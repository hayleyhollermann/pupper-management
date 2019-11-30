import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, TextField, Paper } from '@material-ui/core';
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
          vetPhone: ''
      },
      showPt2: false
  }

  // changes specific property in state to input
  editNewPet = (property, event) => {
      this.setState({
          ...this.state,
          newPet: {
            ...this.state.newPet,
            [property]: event.target.value
          },
      })
  }

  // changes to page 2 of AddPet
  addPetPart2 = () => {
    this.setState({
        ...this.state,
        showPt2: !this.state.showPt2
    })
  }

  // sends info to addNewPet Saga 
  sumbitPet = () => {
    this.props.dispatch({type: 'ADD_PET', payload: this.state.newPet});
    swal("Done!", `Added ${this.state.newPet.name} to your household!`, "success")
    .then(() => {
      this.props.history.push('/home');
    });
  }

  render() {
    return (
      <div className="paperDiv">
        <Paper className="paperArea center"> 
            <div>
              <h2>General Info</h2>
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
             <h2>Vet Info</h2>
             <TextField margin="dense" variant="outlined" label="Vet Name" fullWidth={true} value={this.state.newPet.vetName}
                onChange={ (event)=> this.editNewPet('vetName', event)}
              />  
             <TextField margin="dense" variant="outlined" label="Vet Phone" fullWidth={true} value={this.state.newPet.vetPhone}
                onChange={ (event)=> this.editNewPet('vetPhone', event)}
              />  
             <Button variant="contained" onClick={this.sumbitPet}>Submit</Button>
          </div>
        </Paper>
        <pre>{JSON.stringify(this.state, null, 2)}</pre>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  pets: state.petsReducer.pets,
  events: state.petEventsReducer.petEvents,
});

export default connect(mapStateToProps)(withRouter(AddPet));