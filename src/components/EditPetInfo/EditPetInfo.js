import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Button } from '@material-ui/core';
import EditMedicationsTable from '../EditMedicationsTable/EditMedicationsTable';
import EditPetWeight from '../EditPetWeight/EditPetWeight';
import EditPetAge from '../EditPetAge/EditPetAge';
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

  render() {
    return (
      <>
        <div>
          <h1>General Info</h1>
            <EditPetWeight petId={this.props.match.params.id}/>
            <EditPetAge petId={this.props.match.params.id}/>
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