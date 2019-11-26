import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Input, Fab } from '@material-ui/core';
import DoneIcon from '@material-ui/icons/Done';


import EditIcon from '@material-ui/icons/Edit';

// import swal from 'sweetalert';



class EditPetAge extends Component {

  state = {
    editInfo: {
      weight: '',
      age: '',
      vetName: '',
      vetPhone: '',
    },
    showInput: false,
  }

  ageInput = (event) => {
    this.setState({
      ...this.state,
      editInfo: {
        weight: this.props.petInfo.weight,
        vetName: this.props.petInfo.vet_name,
        vetPhone: this.props.petInfo.vet_phone,
        age: event.target.value
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
        <p>Age:</p>
        {!this.state.showInput ? 
          <div>
            {(this.props.petInfo.age) ? <span>{this.props.petInfo.age} years </span> 
            : '' 
            } <Fab size="small" onClick={this.toggleEdit}><EditIcon/></Fab>
          </div>
        : <div>
            <Input placeholder='age' onChange={this.ageInput}/>
            <Fab size="small" onClick={this.submitChange}><DoneIcon/></Fab>
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

export default connect(mapStateToProps)(withRouter(EditPetAge));