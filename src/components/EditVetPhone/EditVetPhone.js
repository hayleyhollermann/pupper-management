import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Input, Fab, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';


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
        <Typography variant="h5" component="h3">
          Vet Phone: 
        </Typography>
        {!this.state.showInput ? 
          <div>
            <Fab size="small" onClick={this.toggleEdit}><EditIcon/></Fab>
            {(this.props.petInfo.vet_phone) ? <span className="editInfo"> {this.props.petInfo.vet_phone}</span> 
            : '' 
            } 
          </div>
        : <div>
            <Input placeholder='vet phone' onChange={this.vetPhoneInput}/>
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

export default connect(mapStateToProps)(withRouter(EditVetPhone));