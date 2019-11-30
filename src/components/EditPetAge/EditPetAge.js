import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Input, Fab, Typography } from '@material-ui/core';
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
        <Typography variant="h5" component="h3">
          Age: 
        </Typography>
        {!this.state.showInput ? 
          <div>
            <Fab size="small" onClick={this.toggleEdit}><EditIcon/></Fab>
            {(this.props.petInfo.age) ? <span className="editInfo"> {this.props.petInfo.age} years </span> 
            : '' 
            } 
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