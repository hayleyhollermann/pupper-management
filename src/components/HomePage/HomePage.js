import React, { Component } from 'react';
import { connect } from 'react-redux';
import PetCard from '../PetCard/PetCard';
import {Button} from '@material-ui/core';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import { withRouter } from 'react-router-dom';



class HomePage extends Component {

  componentDidMount() {
    this.props.dispatch({type: 'FETCH_HH_EVENTS'})
    this.props.dispatch({ type: 'FETCH_PETS' });
  }

  addAPetForm = () => {
    this.props.history.push(`/add-pet/${this.props.user.selected_household_id}`)
  }

  createHousehold = () => {
    this.props.history.push(`/create-household`)
  }

  render() {
    return (
      <div>
        <h1 id="welcome">
          Welcome, {this.props.user.username}!
        </h1>
        { this.props.user.selected_household_id ? 
        <div>
          <h2>The id of your household is: {this.props.user.selected_household_id}</h2>
            {this.props.pets.map((pet) => 
              <PetCard key={pet.id} pet={pet}
              events = {this.props.householdEvents && this.props.householdEvents.length > 1 ? this.props.householdEvents.filter(recentEvents => recentEvents.id === pet.id)
              : [] } />
            )}
          <Button size='large' onClick={this.addAPetForm}>
            <AddRoundedIcon /> Add a Pet
          </Button>
        </div>
        : 
        <div>
          <h2>Get started by creating a household!</h2>
          <Button size='large' onClick={this.createHousehold}>
            <AddRoundedIcon /> Create a Household
          </Button>
        </div>
        }
      </div>
    )
  }
}

// Instead of taking everything from state, we just want the user info.
// if you wanted you could write this code like this:
// const mapStateToProps = ({user}) => ({ user });
const mapStateToProps = state => ({
  user: state.user,
  // usersHouseholds: state.usersHouseholds.usersHouseholds, //why?????
  pets: state.petsReducer.pets,
  events: state.petEventsReducer.petEvents,
  householdEvents: state.petEventsReducer.householdPetsEvents,
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(withRouter(HomePage));
