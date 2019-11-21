import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment-timezone';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PetsIcon from '@material-ui/icons/Pets';


class HomePage extends Component {

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