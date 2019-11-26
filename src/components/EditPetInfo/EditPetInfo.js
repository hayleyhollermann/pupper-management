import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import EditMedicationsTable from '../EditMedicationsTable/EditMedicationsTable';
import EditPetWeight from '../EditPetWeight/EditPetWeight';
import EditPetAge from '../EditPetAge/EditPetAge';
import EditVetName from '../EditVetName/EditVetName';
import EditVetPhone from '../EditVetPhone/EditVetPhone';

// import swal from 'sweetalert';



class EditPetInfo extends Component {

  componentDidMount () {
    let petId = this.props.match.params.id;
    this.props.dispatch({type: 'FETCH_PET', payload: petId})
    this.props.dispatch({type: 'FETCH_MEDS', payload: petId})
  }

  render() {
    return (
      <>
        <div>
            <h3>General Info</h3>
            <EditPetWeight petId={this.props.match.params.id}/>
            <EditPetAge petId={this.props.match.params.id}/>
            <h3>Vet Info:</h3>
            <EditVetName petId={this.props.match.params.id}/>
            <EditVetPhone petId={this.props.match.params.id}/>
            <EditMedicationsTable/>
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