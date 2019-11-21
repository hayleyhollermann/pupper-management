import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import swal from 'sweetalert';



class ChangeHousehold extends Component {
  state = {

  }

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_HOUSEHOLDS' });
  }

  switchHouseholds = (household) => {
    this.props.dispatch({type: 'CHANGE_HOUSEHOLD', payload: {selected_id: household.id}})
    swal("Awesome!", `Switching to ${household.name}!`)
    .then(() => {
      this.props.history.push('/home');
    });
  }

  render() {
    return (
      <div>
        <h3>Which household would you like to view?</h3>
          {this.props.usersHouseholds.map((household) =>
            <div key={household.id}><Button onClick={ () => this.switchHouseholds(household)}>{household.name}</Button><br/></div>
          )}
      </div>
    )
  }
}


const mapStateToProps = state => ({
  user: state.user,
  usersHouseholds: state.usersHouseholds.usersHouseholds, 
  pets: state.petsReducer.pets,
  events: state.petEventsReducer.petEvents,
});

export default connect(mapStateToProps)(withRouter(ChangeHousehold));