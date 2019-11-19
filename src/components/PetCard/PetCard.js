import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
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
    // this.props.dispatch({type: 'FETCH_EVENTS', payload: this.props.pet.id})
    // this.getAllTimes(this.props.events)
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
              Fed: {this.state.fed}<br />
              Walked: {this.state.walked}<br />
              Last Outside: {this.state.last_outside}<br />
            </Typography>
          </CardContent>
          <CardActions>
            <Button size='large' onClick={()=>this.getPetInfo(this.props.pet)} size="small"><PetsIcon /></Button>
          </CardActions>
        </Card>
      </>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  pets: state.petsReducer.pets,
  events: state.petEventsReducer.petEvents,
});

export default connect(mapStateToProps)(withRouter(HomePage));