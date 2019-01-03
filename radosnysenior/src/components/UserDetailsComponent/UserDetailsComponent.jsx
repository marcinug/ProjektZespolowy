import React, { PureComponent } from 'react';
import * as moment from 'moment';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import AppBarComponent from '../AppBarComponent/AppBarComponent';
import './UserDetailsComponent.css';
import { Paper } from '@material-ui/core';
import LoaderComponent from '../LoaderComponent/LoaderComponent';

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
    });
  };

  componentWillUnmount() {
    if (unsubscribe) unsubscribe();
  }

  render() {
    const { currentUser, loading } = this.state;
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
                    <a href={`mailto: ${currentUser.email}`}>
                      {currentUser.email}
                    </a>
                  </h2>
                  <fieldset class="rating">
                    <input type="radio" id="star5" name="rating" value="5" />
                    <label class="full" for="star5" title="Awesome - 5 stars" />
                    <input
                      type="radio"
                      id="star4half"
                      name="rating"
                      value="4 and a half"
                    />
                    <label
                      class="half"
                      for="star4half"
                      title="Pretty good - 4.5 stars"
                    />
                    <input type="radio" id="star4" name="rating" value="4" />
                    <label
                      class="full"
                      for="star4"
                      title="Pretty good - 4 stars"
                    />
                    <input
                      type="radio"
                      id="star3half"
                      name="rating"
                      value="3 and a half"
                    />
                    <label
                      class="half"
                      for="star3half"
                      title="Meh - 3.5 stars"
                    />
                    <input type="radio" id="star3" name="rating" value="3" />
                    <label class="full" for="star3" title="Meh - 3 stars" />
                    <input
                      type="radio"
                      id="star2half"
                      name="rating"
                      value="2 and a half"
                    />
                    <label
                      class="half"
                      for="star2half"
                      title="Kinda bad - 2.5 stars"
                    />
                    <input type="radio" id="star2" name="rating" value="2" />
                    <label
                      class="full"
                      for="star2"
                      title="Kinda bad - 2 stars"
                    />
                    <input
                      type="radio"
                      id="star1half"
                      name="rating"
                      value="1 and a half"
                    />
                    <label
                      class="half"
                      for="star1half"
                      title="Meh - 1.5 stars"
                    />
                    <input type="radio" id="star1" name="rating" value="1" />
                    <label
                      class="full"
                      for="star1"
                      title="Sucks big time - 1 star"
                    />
                    <input
                      type="radio"
                      id="starhalf"
                      name="rating"
                      value="half"
                    />
                    <label
                      class="half"
                      for="starhalf"
                      title="Sucks big time - 0.5 stars"
                    />
                  </fieldset>
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
