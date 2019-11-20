import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Input } from '@material-ui/core';



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
    // console.log(this.props.match.params.id);
    this.props.dispatch({type: 'ADD_PET', payload: this.state.newPet})
    this.props.history.push('/home')
  }

  render() {
    return (
      <>
        { !this.state.showPt2 ? 
            <div>
              <h1>General Info</h1>
              <Input placeholder="Name" fullWidth={true} value={this.state.newPet.name}
                onChange={ (event)=> this.editNewPet('name', event)}
              /> 
              <Input placeholder="Breed" fullWidth={true} value={this.state.newPet.breed}
                onChange={ (event)=> this.editNewPet('breed', event)}
              /> 
              <Input placeholder="Weight" fullWidth={true} value={this.state.newPet.weight}
                onChange={ (event)=> this.editNewPet('weight', event)}
              />  
              <Input placeholder="Age" fullWidth={true} value={this.state.newPet.age}
                onChange={ (event)=> this.editNewPet('age', event)}
              /> 
              <Button onClick={this.addPetPart2}>NEXT</Button>
            </div>
          : 
          <div>
             <h1>Vet Info</h1>
             <Input placeholder="Vet Name" fullWidth={true} value={this.state.newPet.vetName}
                onChange={ (event)=> this.editNewPet('vetName', event)}
              />  
             <Input placeholder="Vet Phone" fullWidth={true} value={this.state.newPet.vetPhone}
                onChange={ (event)=> this.editNewPet('vetPhone', event)}
              />  
             <h1>Medications</h1>
             <Input placeholder="Medication Name" fullWidth={true} value={this.state.newPet.medName}
                onChange={ (event)=> this.editNewPet('medName', event)}
              />  
             <Input placeholder="Amount" fullWidth={true} value={this.state.newPet.medAmount}
                onChange={ (event)=> this.editNewPet('medAmount', event)}
              />  
             <Input placeholder="Frequency" fullWidth={true} value={this.state.newPet.medFreq}
                onChange={ (event)=> this.editNewPet('medFreq', event)}
              /> 

             <Button onClick={this.SumbitPet}>Submit</Button>
          </div>
        }
        <pre>{JSON.stringify(this.state)}</pre>
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