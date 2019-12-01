import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Input, Fab, Typography } from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';


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
        <Typography variant="h6" component="h3">
          Weight: 
        </Typography>
        {!this.state.showInput ? 
          <div>
            <Fab size="small" onClick={this.toggleEdit}><EditIcon/></Fab>
            {(this.props.petInfo.weight) ? <span className="editInfo"> {this.props.petInfo.weight}lbs </span> 
            : '' 
            } 
          </div>
        : <div>
            <Input placeholder='weight' onChange={this.weightInput}/>
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

export default connect(mapStateToProps)(withRouter(EditPetWeight));