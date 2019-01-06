import React, { PureComponent } from 'react';
import * as moment from 'moment';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import AppBarComponent from '../AppBarComponent/AppBarComponent';
import './AddEventComponent.css';
import {
  Paper,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';
import Datetime from 'react-datetime';
import 'moment/locale/pl';

const AddEventPage = () => <AddEvent />;

var unsubscribe = null;

class AddEventComponent extends PureComponent {
  state = {
    addedBy: '',
    participants: [],
    city: '',
    province: '',
    heading: '',
    desc: '',
    date: moment(),
  };

  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(user => {
      if (user) {
        const currTime = moment().format();
        this.setState({ addedBy: user.email });
        this.setState({ created: currTime });
        this.setState({ participants: [user.email] });
      } else {
        this.props.history.push('/');
      }
    });
  }

  handleSubmit = () => {
    const fb = this.props.firebase;
    fb.addEvent({
      ...this.state,
      date: moment(this.state.date).toISOString(),
    });
    this.props.history.push('/events');
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleDateChange = event => {
    this.setState({
      date: event._d,
    });
  };

  componentWillUnmount() {
    if (unsubscribe) unsubscribe();
  }

  render() {
    return (
      <div className="mainContainer">
        <AppBarComponent />
        <Paper className="paperContainer">
          <div className="appContainer">
            <div className="mainPageHeading">
              <h1>Dodaj wydarzenie</h1>
            </div>
            <div className="addEventFormContainer">
              <TextField
                id="standard-name"
                label="Nagłówek"
                value={this.state.heading}
                onChange={this.handleChange('heading')}
                margin="normal"
              />
              <TextField
                id="outlined-multiline-flexible"
                label="Opis"
                multiline
                rows="8"
                rowsMax="20"
                value={this.state.description}
                onChange={this.handleChange('description')}
                margin="normal"
              />
              <InputLabel className="selectInput" htmlFor="province">
                Województwo
              </InputLabel>
              <Select
                value={this.state.province}
                onChange={this.handleChange('province')}
                inputProps={{
                  name: 'province',
                  id: 'province',
                }}
              >
                <MenuItem value="" />
                <MenuItem value="dolnośląskie">dolnośląskie</MenuItem>
                <MenuItem value="kujawsko-pomorskie">
                  kujawsko-pomorskie
                </MenuItem>
                <MenuItem value="lubelskie">lubelskie</MenuItem>
                <MenuItem value="lubuskie">lubuskie</MenuItem>
                <MenuItem value="łódzkie">łódzkie</MenuItem>
                <MenuItem value="małopolskie">małopolskie</MenuItem>
                <MenuItem value="mazowieckie">mazowieckie</MenuItem>
                <MenuItem value="opolskie">opolskie</MenuItem>
                <MenuItem value="podkarpackie">podkarpackie</MenuItem>
                <MenuItem value="podlaskie">podlaskie</MenuItem>
                <MenuItem value="pomorskie">pomorskie</MenuItem>
                <MenuItem value="śląskie">śląskie</MenuItem>
                <MenuItem value="świętokrzyskie">świętokrzyskie</MenuItem>
                <MenuItem value="warmińsko-mazurskie">
                  warmińsko-mazurskie
                </MenuItem>
                <MenuItem value="wielkopolskie">wielkopolskie</MenuItem>
                <MenuItem value="zachodniopomorskie">
                  zachodniopomorskie
                </MenuItem>
              </Select>
              <TextField
                id="standard-name"
                label="Miejscowość"
                value={this.state.city}
                onChange={this.handleChange('city')}
                margin="normal"
                type="text"
              />
              <InputLabel className="selectInput" htmlFor="province">
                Data i czas wydarzenia
              </InputLabel>
              <Datetime
                locale="pl"
                name="date"
                value={this.state.date}
                onChange={this.handleDateChange}
              />
              <span
                className="formSentButton"
                role="button"
                aria-hidden
                onClick={this.handleSubmit}
              >
                WYŚLIJ
              </span>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

const AddEvent = compose(
  withFirebase,
  withRouter,
)(AddEventComponent);

export default AddEventPage;
