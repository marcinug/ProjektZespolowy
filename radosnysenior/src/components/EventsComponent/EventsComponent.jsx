import React from 'react';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { withRouter, Link } from 'react-router-dom';
import * as moment from 'moment';
import AppBarComponent from '../AppBarComponent/AppBarComponent';
import SingleEventComponent from '../SingleEventComponent/SingleEventComponent';
import {
  Paper,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@material-ui/core';
import './EventsComponent.css';

const EventsPage = () => <EventsList />;

var unsubscribe = null;

class EventsComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      events: [],
      isUserLogged: false,
      filteredEvents: null,
      province: '',
    };
  }

  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ isUserLogged: true });
      } else {
        this.props.history.push('/');
      }
    });
    this.setState({ loading: true });
    this.parseData();
  }

  parseData = () => {
    let events = [];
    let fb = this.props.firebase;
    unsubscribe = fb.allEvents().onSnapshot(querySnapshot => {
      events = [];
      querySnapshot.forEach(doc => {
        events.push(Object.assign({ id: doc.id }, doc.data()));
      });
      events.sort(function(a, b) {
        return new Date(a.date) - new Date(b.date);
      });
      this.setState({ events });
      this.setState({ loading: false });
    });
  };

  handleProvinceChange = name => event => {
    const chosenEvent = event.target.value;
    this.setState({ [name]: chosenEvent });

    if (chosenEvent === '') {
      this.setState({ filteredEvents: null });
      this.parseData();
    } else {
      const posts = this.state.events;
      const filteredPosts = posts.filter(function(post) {
        return post.province === chosenEvent;
      });
      this.setState({ filteredEvents: filteredPosts });
    }
  };

  componentWillUnmount() {
    if (unsubscribe) unsubscribe();
  }

  render() {
    const { events, loading, filteredEvents } = this.state;
    return (
      <div className="mainContainer">
        <AppBarComponent />
        <Paper className="paperContainer">
          <div className="appContainer">
            <div className="mainPageHeading eventsHeading allEventsHeading">
              <h1>Wydarzenia</h1>
              <div className="addAndFilterEvents">
                <FormControl
                  variant="filled"
                  className="postTypeSelect eventTypeSelect"
                >
                  <InputLabel htmlFor="filled-age-native-simple">
                    Województwo
                  </InputLabel>
                  <Select
                    value={this.state.province}
                    onChange={this.handleProvinceChange('province')}
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
                </FormControl>
                <Link to="/newEvent" className="reactRouterLinkEvents">
                  <span
                    className="eventsHeading__button"
                    role="button"
                    aria-hidden
                  >
                    DODAJ WYDARZENIE
                  </span>
                </Link>
              </div>
            </div>
            {loading ? (
              <CircularProgress />
            ) : (
              <div>
                {filteredEvents
                  ? filteredEvents.map(
                      event =>
                        moment(event.date).isAfter(moment()) && (
                          <SingleEventComponent event={event} key={event.id} />
                        ),
                    )
                  : events.map(
                      event =>
                        moment(event.date).isAfter(moment()) && (
                          <SingleEventComponent event={event} key={event.id} />
                        ),
                    )}
              </div>
            )}
          </div>
        </Paper>
      </div>
    );
  }
}

const EventsList = compose(
  withFirebase,
  withRouter,
)(EventsComponent);

export default EventsPage;
