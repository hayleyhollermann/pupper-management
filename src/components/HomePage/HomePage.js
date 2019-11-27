import React, { Component } from 'react';
import { connect } from 'react-redux';
import PetCard from '../PetCard/PetCard';
import {Fab} from '@material-ui/core';
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
            {this.props.pets.map((pet) => 
              <PetCard key={pet.id} pet={pet}
              events = {this.props.householdEvents && this.props.householdEvents.length > 1 ? this.props.householdEvents.filter(recentEvents => recentEvents.id === pet.id)
              : [] } />
            )} <br />
          {this.props.pets && this.props.pets.length>0 && this.props.pets[0].is_admin ? 
            <Fab variant="extended" size='large' onClick={this.addAPetForm}>
              <AddRoundedIcon /> Add a Pet
            </Fab>
            :
            ''
          }
        </div>
        : 
        <div>
          <h2>Get started by creating a household!</h2>
          <Fab variant="extended" size='large' onClick={this.createHousehold}>
            <AddRoundedIcon /> Create a Household
          </Fab>
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
