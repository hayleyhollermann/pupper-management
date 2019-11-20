import React, { Component } from 'react';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';


class HomePage extends Component {

  componentDidMount () {
    let Petid = this.props.match.params.id
    this.props.dispatch({type: 'FETCH_EVENTS', payload: Petid})
    this.props.dispatch({type: 'FETCH_PET', payload: Petid})
    // this.mostRecentEvent(this.props.events);
  }

//   mostRecentEvent = (recentEvents) => {
//       console.log('in mostRecentEvent');
      
//       for (let i = 0; i < recentEvents.length; i++) {
//           const el = recentEvents[i];
//           console.log(el);
//       }
//   }

  render() {
    return (
      <>
    <Paper className="petInfoPaper" elevation={3}>
      <Typography variant="h4" component="h3">
        {this.props.petInfo.name}
      </Typography>
      <Typography component="p">
        
        Fed: {this.props.events.length > 1 ? 
                this.props.events.filter(recentEvents => recentEvents.event_type === 'fed')[0].time
             : 'N/A'  } <br />
        Walked: {this.props.events.length > 1 ? 
                this.props.events.filter(recentEvents => recentEvents.event_type === 'walked')[0].time
             : 'N/A'  } <br />
        Last Outside: {this.props.events.length > 1 ? 
                this.props.events.filter(recentEvents => recentEvents.event_type === 'last outside')[0].time
             : 'N/A'  } <br />
      </Typography>
      <Typography component="p">
        Breed: {this.props.petInfo.breed} <br />
        Weight: {this.props.petInfo.weight} <br />
        Age: {this.props.petInfo.age} <br />
        Vet Name: {
            this.props.petInfo.vet_name ? this.props.petInfo.vet_name
            : 'No vet name on file'
        } <br />
        Vet Phone: {
            this.props.petInfo.vet_phone ? this.props.petInfo.vet_phone
            : 'No vet phone on file'        
        } <br />
      </Typography>
    </Paper>
    <pre>{JSON.stringify(this.props.events.filter(recentEvents => recentEvents.event_type === 'fed')[0])}</pre>
    <pre>{JSON.stringify(this.props.petInfo)}</pre>
    <pre>{JSON.stringify(this.props.events)}</pre>
      </>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  pets: state.petsReducer.pets,
  events: state.petEventsReducer.petEvents,
  petInfo: state.petsReducer.petInfo
});

export default connect(mapStateToProps)(HomePage);