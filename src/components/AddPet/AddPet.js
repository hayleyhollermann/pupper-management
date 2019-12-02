import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, TextField, Paper, Typography } from '@material-ui/core';
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
  }

  autoFill = () => {
    console.log('autofilling info!!');
    this.setState({
      newPet: {
        householdId: this.props.match.params.id,
        name: 'Bagley',
        breed: 'Great Pyrenese',
        weight: 25,
        age: 0,
        vetName: 'Hopkins Animal Hospital',
        vetPhone: '952-935-5566'
      }
    })
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
              <Typography variant="h5" component="h3" onClick={this.autoFill}>General Info</Typography>
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
             <Typography variant="h5" component="h3">Vet Info</Typography>
             <TextField margin="dense" variant="outlined" label="Vet Name" fullWidth={true} value={this.state.newPet.vetName}
                onChange={ (event)=> this.editNewPet('vetName', event)}
              />  
             <TextField margin="dense" variant="outlined" label="Vet Phone" fullWidth={true} value={this.state.newPet.vetPhone}
                onChange={ (event)=> this.editNewPet('vetPhone', event)}
              />  
             <Button variant="contained" onClick={this.sumbitPet}>Submit</Button>
          </div>
        </Paper>
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