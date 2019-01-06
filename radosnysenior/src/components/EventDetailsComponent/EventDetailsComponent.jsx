import React, { PureComponent } from 'react';
import * as moment from 'moment';
import { compose } from 'recompose';
import { Link } from 'react-router-dom';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import AppBarComponent from '../AppBarComponent/AppBarComponent';
import './EventDetailsComponent.css';
import { Paper } from '@material-ui/core';
import LoaderComponent from '../LoaderComponent/LoaderComponent';

const PostDetailsPage = () => <PostDetails />;

var unsubscribe = null;

class EventDetailsComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      events: [],
      currentEvent: null,
      isUserLogged: false,
    };
  }

  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ isUserLogged: true });
        this.setState({ currentUser: user.email });
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
      this.setState({ events });
      this.setState({ loading: false });
      const currentEvent = events.find(
        x => x.id === this.props.match.params.id,
      );
      this.setState({ currentEvent });
    });
  };

  componentWillUnmount() {
    if (unsubscribe) unsubscribe();
  }

  render() {
    const { currentEvent, loading } = this.state;
    return (
      <div className="mainContainer">
        <AppBarComponent />
        {loading ? (
          <LoaderComponent />
        ) : (
          currentEvent && (
            <React.Fragment>
              <Paper className="paperContainer paperPostContainer">
                <div className="appContainer">
                  <div className="mainPageHeading">
                    <h1>{currentEvent.heading}</h1>
                  </div>
                  <div className="eventHeading">
                    <div />
                    <div className="eventHeading__heading">
                      {/* {moment(currentEvent.date).weekday()} */}
                      {moment(currentEvent.date).format('DD.MM.YYYY, HH:mm')}
                    </div>
                    <div>
                      {currentEvent.city}, {currentEvent.province}
                    </div>
                  </div>
                  <div className="eventDescription">{currentEvent.desc}</div>
                  <div className="addedBy">
                    <div>
                      Dodane przez:{' '}
                      <Link
                        to={`/users/${currentEvent.addedBy}`}
                        className="reactRouterBlueLink"
                      >
                        {currentEvent.addedBy}
                      </Link>
                      ;{' '}
                      {moment(currentEvent.created).format('DD.MM.YYYY, HH:mm')}
                    </div>
                    <div className="participants">
                      <p>UCZESTNICY</p>
                      {currentEvent.participants &&
                        currentEvent.participants.map(user => (
                          <Link
                            to={`/users/${user}`}
                            className="reactRouterParticipantLink"
                            key={user}
                          >
                            <li>{user}</li>
                          </Link>
                        ))}
                    </div>
                  </div>
                </div>
              </Paper>
            </React.Fragment>
          )
        )}
      </div>
    );
  }
}

const PostDetails = compose(
  withFirebase,
  withRouter,
)(EventDetailsComponent);

export default PostDetailsPage;
