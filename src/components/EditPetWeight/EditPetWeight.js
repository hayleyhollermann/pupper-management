import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Input } from '@material-ui/core';
// import swal from 'sweetalert';



class EditPetWeight extends Component {

  state = {
    editInfo: {
      weight: '',
      age: '',
      vetName: '',
      vetPhone: '',
    },
    showInput: false,
  }

  weightInput = (event) => {
    this.setState({
      ...this.state,
      editInfo: {
        age: this.props.petInfo.age,
        vetName: this.props.petInfo.vet_name,
        vetPhone: this.props.petInfo.vet_phone,
        weight: event.target.value
      }
    })
  }

  toggleEdit = () => {
    this.setState({
      ...this.state,
      showInput: !this.state.showInput
    })
  }

  submitChange = () => {
    this.props.dispatch({type: 'EDIT_INFO', payload: {editInfo: this.state.editInfo, petId: this.props.petId}})
    this.toggleEdit();
  }

  render() {
    return (
      <>
        <p>Weight:</p>
        {!this.state.showInput ? 
          <div>
            {(this.props.petInfo.weight) ? <span>{this.props.petInfo.weight}lbs </span> 
            : '' 
            } <Button onClick={this.toggleEdit}>Edit</Button>
          </div>
        : <div>
            <Input placeholder='weight' onChange={this.weightInput}/>
            <Button onClick={this.submitChange}>Save Changes</Button>
        </div>
        }
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

export default connect(mapStateToProps)(withRouter(EditPetWeight));