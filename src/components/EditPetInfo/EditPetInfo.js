import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Paper, Typography, Button } from '@material-ui/core';
import EditMedicationsTable from '../EditMedicationsTable/EditMedicationsTable';
import EditPetWeight from '../EditPetWeight/EditPetWeight';
import EditPetAge from '../EditPetAge/EditPetAge';
import EditVetName from '../EditVetName/EditVetName';
import EditVetPhone from '../EditVetPhone/EditVetPhone';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';


class EditPetInfo extends Component {

  componentDidMount () {
    let petId = this.props.match.params.id;
    this.props.dispatch({type: 'FETCH_PET', payload: petId})
    this.props.dispatch({type: 'FETCH_MEDS', payload: petId})
  }

  backToPetInfo = (petId) => {
    this.props.history.push(`/home/${petId}`)
  }

  render() {
    return (
      <>
        <div className="paperDiv">
        <Button onClick={ () => this.backToPetInfo(this.props.petInfo.id)}><ArrowBackIcon/></Button>
          <Paper className="paperArea">
            <Typography className="centerTitle" variant="h5" component="h3">
              General Info: 
            </Typography>
            <EditPetWeight petId={this.props.match.params.id}/>
            <EditPetAge petId={this.props.match.params.id}/>
            <Typography className="centerTitle" variant="h5" component="h3">
              Vet Info: 
            </Typography>
            <EditVetName petId={this.props.match.params.id}/>
            <EditVetPhone petId={this.props.match.params.id}/>
            <EditMedicationsTable/>
          </Paper>
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