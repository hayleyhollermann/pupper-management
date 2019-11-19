import React, { Component } from 'react';
import { connect } from 'react-redux';
import PetCard from '../PetCard/PetCard';
import {Button} from '@material-ui/core';
import AddRoundedIcon from '@material-ui/icons/AddRounded';


class HomePage extends Component {
  state = {

  }

  componentDidMount() {
    this.props.dispatch({ type: 'FETCH_HOUSEHOLDS' });
    // this.props.dispatch({ type: 'FETCH_EVENTS', payload: this.props.user.selected_household_id })
    this.props.dispatch({ type: 'FETCH_PETS' });
  }


  render() {
    return (
      <div>
        <h1 id="welcome">
          Welcome, {this.props.user.username}!
      </h1>
        <h2>The id of your household is: {this.props.user.selected_household_id}</h2>
        {this.props.pets.map((pet) => 
          <PetCard key={pet.id} pet={pet} />
        )}
      <Button size='large'>
        <AddRoundedIcon /> Add a Pet
      </Button>

      <p>you belong to these households:</p>
        <ul> {this.props.usersHouseholds.map((household) =>
          <li key={household.id}>{household.name}</li>
        )}
        </ul>
      </div>
    )
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
  usersHouseholds: state.usersHouseholds.usersHouseholds, //why?????
  pets: state.petsReducer.pets,
  events: state.petEventsReducer.petEvents,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(HomePage);
