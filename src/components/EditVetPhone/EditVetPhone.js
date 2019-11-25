import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button, Input } from '@material-ui/core';
// import swal from 'sweetalert';



class EditVetPhone extends Component {

  state = {
    editInfo: {
      weight: '',
      age: '',
      vetName: '',
      vetPhone: '',
    },
    showInput: false,
  }

  vetPhoneInput = (event) => {
    this.setState({
      ...this.state,
      editInfo: {
        age: this.props.petInfo.age,
        weight: this.props.petInfo.weight,
        vetName: this.props.petInfo.vet_name,
        vetPhone: event.target.value
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
        <p>Vet Phone:</p>
        {!this.state.showInput ? 
          <div>
            {(this.props.petInfo.vet_phone) ? <span>{this.props.petInfo.vet_phone}</span> 
            : '' 
            } <Button onClick={this.toggleEdit}>Edit</Button>
          </div>
        : <div>
            <Input placeholder='vet name' onChange={this.vetPhoneInput}/>
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

export default connect(mapStateToProps)(withRouter(EditVetPhone));