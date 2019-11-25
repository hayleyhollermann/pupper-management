import React, {Component} from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom';

import {connect} from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'

import AboutPage from '../AboutPage/AboutPage';
// import InfoPage from '../InfoPage/InfoPage';

import './App.css';
import HomePage from '../HomePage/HomePage';
import PetInfo from '../PetInfo/PetInfo';
import AddPet from '../AddPet/AddPet';
import Settings from '../Settings/Settings';
import AddUserToHousehold from '../AddUserToHousehold/AddUserToHousehold';
import ChangeHousehold from '../ChangeHousehold/ChangeHousehold';
import CreateHousehold from '../CreateHousehold/CreateHousehold';
import EditPetInfo from '../../EditPetInfo/EditPetInfo';

class App extends Component {
  componentDidMount () {
    this.props.dispatch({type: 'FETCH_USER'})
  }

  render() {
    return (
      <Router>
        <div>
          <Nav />
          <Switch>
            {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
            <Redirect exact from="/" to="/home" />
            {/* Visiting localhost:3000/about will show the about page.
            This is a route anyone can see, no login necessary */}
            <Route
              exact
              path="/about"
              component={AboutPage}
            />
            {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/home will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the 'Login' or 'Register' page.
            Even though it seems like they are different pages, the user is always on localhost:3000/home */}
            <ProtectedRoute
              exact
              path="/home"
              component={HomePage}
            />
            {/* This works the same as the other protected route, except that if the user is logged in,
            they will see the info page instead. */}
            <ProtectedRoute
              exact
              path="/settings"
              component={Settings}
            />
            <ProtectedRoute exact path="/home/:id" component={PetInfo}/>
            <ProtectedRoute exact path="/add-pet/:id" component={AddPet}/>
            <ProtectedRoute exact path="/add-hh-user" component={AddUserToHousehold}/>
            <ProtectedRoute exact path="/change-household" component={ChangeHousehold}/>
            <ProtectedRoute exact path="/create-household" component={CreateHousehold}/>
            <ProtectedRoute exact path="/edit-pet-info/:id" component={EditPetInfo}/>
            {/* If none of the other routes matched, we will show a 404. */}
            <Route render={() => <h1>404</h1>} />
          </Switch>
          <Footer />
        </div>
      </Router>
  )}
}

export default connect()(App);
