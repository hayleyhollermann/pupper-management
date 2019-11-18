import React, { Component } from 'react';
import { connect } from 'react-redux';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


class HomePage extends Component {

  render() {
    return (
      <>
        <Card >
          <CardContent>
            <Typography color="textPrimary" variant="h4" gutterBottom>
              {this.props.pet.pet_name}
            </Typography>
            <Typography color="textSecondary">
              Fed: <br />
              Walked: <br />
              Last Outside: <br />
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Info</Button>
          </CardActions>
        </Card>
      </>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user,
  pets: state.pets.pets
});

export default connect(mapStateToProps)(HomePage);