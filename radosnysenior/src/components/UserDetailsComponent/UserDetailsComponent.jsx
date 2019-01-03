import React, { PureComponent } from 'react';
import * as moment from 'moment';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import AppBarComponent from '../AppBarComponent/AppBarComponent';
import './UserDetailsComponent.css';
import { Paper } from '@material-ui/core';
import LoaderComponent from '../LoaderComponent/LoaderComponent';
import _ from 'lodash';
import StarComponent from './StarComponent';

const PostDetailsPage = () => <PostDetails />;

var unsubscribe = null;

class PostDetailsComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: false,
      currentUser: null,
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
    let users = [];
    let fb = this.props.firebase;
    unsubscribe = fb.allUsers().onSnapshot(querySnapshot => {
      users = [];
      querySnapshot.forEach(doc => {
        users.push(Object.assign({ id: doc.id }, doc.data()));
      });
      this.setState({ users });
      this.setState({ loading: false });
      const currentUser = users.find(
        x => x.email === this.props.match.params.username,
      );
      this.setState({ currentUser });
      const rates = currentUser.rates.map(arr => arr.rate);
      console.log(rates);
      this.setState({
        userRating: (rates.reduce((p, c) => p + c, 0) / rates.length).toFixed(),
      });
    });
  };

  componentWillUnmount() {
    if (unsubscribe) unsubscribe();
  }

  render() {
    const { currentUser, loading, userRating } = this.state;
    return (
      <div className="mainContainer">
        <AppBarComponent />
        {loading ? (
          <LoaderComponent />
        ) : (
          currentUser && (
            <React.Fragment>
              <Paper
                style={{
                  marginLeft: '2%',
                  marginRight: '2%',
                  paddingBottom: 20,
                }}
                className="paperPostContainer"
              >
                <div className="userDetailsContainer">
                  <h1>Użytkownik: {currentUser.email}</h1>
                  <h2>Imię: {currentUser.firstName}</h2>
                  <h2>Nazwisko: {currentUser.lastName}</h2>
                  <h2>
                    Na portalu od:{' '}
                    {moment(currentUser.since).format('DD.MM.YYYY, HH:mm')}
                  </h2>
                  <h2>
                    Email:{' '}
                    <a
                      className="currentUserMail"
                      href={`mailto: ${currentUser.email}`}
                    >
                      {currentUser.email}
                    </a>
                  </h2>
                  {_.times(userRating, i => (
                    <StarComponent color="#FFDA44" key={i} />
                  ))}
                  {_.times(5 - userRating, i => (
                    <StarComponent color="black" key={i} />
                  ))}
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
)(PostDetailsComponent);

export default PostDetailsPage;
