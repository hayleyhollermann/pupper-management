import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';
import EditMedicationsTable from '../EditMedicationsTable/EditMedicationsTable';
import EditPetWeight from '../EditPetWeight/EditPetWeight'
// import swal from 'sweetalert';



class EditPetInfo extends Component {

  state = {
    editInfo: {
      weight: '',
      age: '',
      vetName: '',
      vetPhone: '',
    }
  }

  componentDidMount () {
    let petId = this.props.match.params.id;
    this.props.dispatch({type: 'FETCH_PET', payload: petId})
    this.props.dispatch({type: 'FETCH_MEDS', payload: petId})
  }

  // medInput = (property, event) => {
  //   this.setState({
  //     ...this.state,
  //     medToAdd: {
  //       ...this.state.medToAdd,
  //       [property]: event.target.value
  //     },
  //   })
  // }

  // addNewMed = () => {
  //   this.props.dispatch({type: 'ADD_MED', payload: {medToAdd: this.state.medToAdd, petId: this.props.match.params.id}})
  //   this.setState({
  //       ...this.state,
  //       medToAdd: {
  //         med_name: '',
  //         quantity: '',
  //         frequency:''
  //       },
  //   })
  // }


  render() {
    return (
      <>
        <div>
          <h1>General Info</h1>
            <EditPetWeight petId={this.props.match.params.id}/>
            <p>Age:</p>
            {(this.props.petInfo.age) ? <span>{this.props.petInfo.age} years </span> 
              : ''
            } <Button>Edit</Button>
            <p>Vet Info:</p>
            {(this.props.petInfo.vetName && this.props.petInfo.vetPhone) ? 
                <span>
                    Vet Name: {this.props.petInfo.vetName} <Button>Edit</Button><br/>
                    Vet Phone: {this.props.petInfo.vetPhone} <Button>Edit</Button>
                </span> 
              : <Button>Add Vet Info</Button>
            }
            <EditMedicationsTable/>
            <pre>{JSON.stringify(this.state, null, 2)}</pre>
            <pre>{JSON.stringify(this.props.petInfo, null, 2)}</pre>
          </div>
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

export default connect(mapStateToProps)(withRouter(EditPetInfo));