import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import Moment from 'react-moment';
import 'moment-timezone';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PetsIcon from '@material-ui/icons/Pets';


class HomePage extends Component {

  state = {
    fed: 'never fed',
    walked: 'never walked',
    last_outside: 'never been outside'
  }

  componentDidMount() {
    // this.props.dispatch({type: 'FETCH_HH_EVENTS'})
  }

//   getAllTimes = (events) => {
//     const eventsForPet = events.filter(event => event.name === this.props.pet.pet_name)
//     console.log(this.props.pet.pet_name, ':', eventsForPet);
//     // this.setTimes(eventsForPet);
//     // for (let i = 0; i < eventsForPet; i++){
//     //     console.log('in for loop');
        
//     // }
//   }

//   setTimes = (events) => {
    
//     // const lastFed = events.filter(event => event.event_type === 'fed');
//     // const lastWalked = events.filter(event => event.event_type === 'walked');
//     // const lastOutside = events.filter(event => event.event_type === 'last outside');
//     // console.log(this.props.pet.pet_name, ': last fed:', ...lastFed, 'last walked:', ...lastWalked, 'last outside:', ...lastOutside);
//     // this.setState({
//     //     ...this.state,
//     //     fed: lastFed[0].time,
//     //     walked: lastWalked[0].time,
//     //     last_outside: lastOutside[0].time
//     // })
//   }

  getPetInfo = () => {
    console.log('getting info for:', this.props.pet.pet_name);
    this.props.history.push(`/home/${this.props.pet.id}`)
  }

  render() {
    return (
      <>
        <Card >
          <CardContent>
            <Typography color="textPrimary" variant="h4" gutterBottom>
              {this.props.pet.pet_name}
            </Typography>
            <Typography color="textSecondary">
              Fed: 
              {(this.props.events.length > 0) && 
                (this.props.events.filter(recentEvents => recentEvents.event_type === 'fed').length > 0) ?  
                <Moment format='LLLL'>
                    {this.props.events.filter(recentEvents => recentEvents.event_type === 'fed')[0].time}
                </Moment>
              : 'N/A'  } <br />
              Walked:               
              {(this.props.events.length > 0) && 
                (this.props.events.filter(recentEvents => recentEvents.event_type === 'walked').length > 0) ?  
                <Moment format='LLLL'>
                    {this.props.events.filter(recentEvents => recentEvents.event_type === 'walked')[0].time}
                </Moment>
              : 'N/A'  } <br />
              Last Outside:               
              {(this.props.events.length > 0) && 
                (this.props.events.filter(recentEvents => recentEvents.event_type === 'last outside').length > 0) ?  
                <Moment format='LLLL'>
                    {this.props.events.filter(recentEvents => recentEvents.event_type === 'last outside')[0].time}
                </Moment>
              : 'N/A'  } <br />
            </Typography>
          </CardContent>
          <CardActions>
            <Button size='large' onClick={this.getPetInfo} ><PetsIcon /></Button>
          </CardActions>
        </Card>
        <pre>{JSON.stringify(this.props.events)}</pre>
      </>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  pets: state.petsReducer.pets,
  householdEvents: state.petEventsReducer.householdPetsEvents,
});

export default connect(mapStateToProps)(withRouter(HomePage));