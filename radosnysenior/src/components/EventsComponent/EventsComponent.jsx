import React from 'react';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { withRouter, Link } from 'react-router-dom';
import * as moment from 'moment';
import AppBarComponent from '../AppBarComponent/AppBarComponent';
import SingleEventComponent from '../SingleEventComponent/SingleEventComponent';
import { Paper, CircularProgress } from '@material-ui/core';
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

  componentWillUnmount() {
    if (unsubscribe) unsubscribe();
  }

  render() {
    const { events, loading } = this.state;
    return (
      <div className="mainContainer">
        <AppBarComponent />
        <Paper className="paperContainer">
          <div className="appContainer">
            <div className="mainPageHeading eventsHeading allEventsHeading">
              <h1>Wydarzenia</h1>
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
            {loading ? (
              <CircularProgress />
            ) : (
              <div>
                {events.map(
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
