import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Input } from '@material-ui/core';



class AddPet extends Component {

  state = {
      newPet: {
          name: '',
          breed: '',
          weight: '',
          age: '',
      },
      showPt2: false
  }

  addPetPart2 = () => {
    this.setState({
        ...this.state,
        showPt2: !this.state.showPt2
    })
  }

  SumbitPet = () => {
    this.props.history.push('/home')
  }

  render() {
    return (
      <>
        { !this.state.showPt2 ? 
            <div>
               <h1>General Info</h1>
               <Input placeholder="Name" fullWidth={true}/> 
               <Input placeholder="Breed" fullWidth={true}/> 
               <Input placeholder="Weight" fullWidth={true}/> 
               <Input placeholder="Age" fullWidth={true}/> 
               <Button onClick={this.addPetPart2}>NEXT</Button>
            </div>
          : 
          <div>
             <h1>Vet Info</h1>
             <Input placeholder="Vet Name" fullWidth={true}/> 
             <Input placeholder="Vet Phone" fullWidth={true}/> 
             <h1>Medications</h1>
             <Input placeholder="Medication Name" fullWidth={true}/> 
             <Input placeholder="Amount" fullWidth={true}/> 
             <Input placeholder="Frequency" fullWidth={true}/> 

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