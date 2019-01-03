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
                    <svg
                      viewBox="0 0 19.481 19.481"
                      enableBackground="new 0 0 19.481 19.481"
                      width="48px"
                      height="48px"
                      key={i}
                    >
                      <g>
                        <path
                          d="m10.201,.758l2.478,5.865 6.344,.545c0.44,0.038 0.619,0.587 0.285,0.876l-4.812,4.169 1.442,6.202c0.1,0.431-0.367,0.77-0.745,0.541l-5.452-3.288-5.452,3.288c-0.379,0.228-0.845-0.111-0.745-0.541l1.442-6.202-4.813-4.17c-0.334-0.289-0.156-0.838 0.285-0.876l6.344-.545 2.478-5.864c0.172-0.408 0.749-0.408 0.921,0z"
                          fill="#FFDA44"
                        />
                      </g>
                    </svg>
                  ))}
                  {_.times(5 - userRating, i => (
                    <svg
                      viewBox="0 0 19.481 19.481"
                      enableBackground="new 0 0 19.481 19.481"
                      width="48px"
                      height="48px"
                      key={i}
                    >
                      <g>
                        <path
                          d="m10.201,.758l2.478,5.865 6.344,.545c0.44,0.038 0.619,0.587 0.285,0.876l-4.812,4.169 1.442,6.202c0.1,0.431-0.367,0.77-0.745,0.541l-5.452-3.288-5.452,3.288c-0.379,0.228-0.845-0.111-0.745-0.541l1.442-6.202-4.813-4.17c-0.334-0.289-0.156-0.838 0.285-0.876l6.344-.545 2.478-5.864c0.172-0.408 0.749-0.408 0.921,0z"
                          fill="black"
                        />
                      </g>
                    </svg>
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
