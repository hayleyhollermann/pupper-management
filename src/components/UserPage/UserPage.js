import React, {Component} from 'react';
import { connect } from 'react-redux';
import LogOutButton from '../LogOutButton/LogOutButton';

// this could also be written with destructuring parameters as:
// const UserPage = ({ user }) => (
// and then instead of `props.user.username` you could use `user.username`
class HomePage extends Component {
  componentDidMount() {
    this.props.dispatch({type: 'FETCH_HOUSEHOLDS'});
    this.props.dispatch({type: 'FETCH_PETS'});

  }

  render() {
    return (
      <div>
      <h1 id="welcome">
        Welcome, { this.props.user.username }!
      </h1>
      <h2>The id of your household is: {this.props.user.selected_household_id}</h2>
      <LogOutButton className="log-in" />
      <pre>{JSON.stringify(this.props.usersHouseholds)}</pre>
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
  usersHouseholds: state.usersHouseholds.usersHouseholds //why?????
});

// this allows us to use <App /> in index.js
export default connect(mapStateToProps)(HomePage);
