import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button} from '@material-ui/core';
import { withRouter } from 'react-router-dom';



class ChangeHousehold extends Component {
  state = {

  }

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_HOUSEHOLDS' });
  }

  switchHouseholds = (id) => {
    console.log(id);
    this.props.dispatch({type: 'CHANGE_HOUSEHOLD', payload: {selected_id: id}})
  }

  render() {
    return (
      <div>
        <h3>Which household would you like to switch to?</h3>
        <p>map through households that user is a part of, append them as buttons, when clicked, switches user.selected_id to that household, redirects to homepage</p>
          {this.props.usersHouseholds.map((household) =>
            <div key={household.id}><Button onClick={ () => this.switchHouseholds(household.id)}>{household.name}</Button><br/></div>
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