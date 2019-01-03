import React, { PureComponent } from 'react';
import * as moment from 'moment';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import AppBarComponent from '../AppBarComponent/AppBarComponent';
import './UserDetailsComponent.css';
import { Paper, TextField, Select, MenuItem } from '@material-ui/core';
import LoaderComponent from '../LoaderComponent/LoaderComponent';
import _ from 'lodash';
import StarComponent from '../StarComponent/StarComponent';
import UserRateComponent from '../UserRateComponent/UserRateComponent';

const PostDetailsPage = () => <PostDetails />;

var unsubscribe = null;

class PostDetailsComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      loading: false,
      currentUser: null,
      isCommentBoxVisible: false,
      newRateRate: '',
      newRateRateContent: '',
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

  handleNewRate = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  toggleCommentVisible = () => {
    this.setState(prevState => ({
      isCommentBoxVisible: !prevState.isCommentBoxVisible,
    }));
  };

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
                    <StarComponent size="48px" color="#FFDA44" key={i} />
                  ))}
                  {_.times(5 - userRating, i => (
                    <StarComponent size="48px" color="black" key={i} />
                  ))}
                </div>
                <svg
                  aria-hidden="true"
                  data-prefix="far"
                  data-icon="comment"
                  className="svg-inline--fa fa-comment fa-w-16 commentIcon"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fontSize="15px"
                  onClick={() => this.toggleCommentVisible()}
                >
                  <path d="M256 32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126.3C38 405.7 7 439.1 6.5 439.5c-6.6 7-8.4 17.2-4.6 26S14.4 480 24 480c61.5 0 110-25.7 139.1-46.3C192 442.8 223.2 448 256 448c141.4 0 256-93.1 256-208S397.4 32 256 32zm0 368c-26.7 0-53.1-4.1-78.4-12.1l-22.7-7.2-19.5 13.8c-14.3 10.1-33.9 21.4-57.5 29 7.3-12.1 14.4-25.7 19.9-40.2l10.6-28.1-20.6-21.8C69.7 314.1 48 282.2 48 240c0-88.2 93.3-160 208-160s208 71.8 208 160-93.3 160-208 160z" />
                </svg>
              </Paper>
              {this.state.isCommentBoxVisible && (
                <div className="newRateForm">
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Opinia o użytkowniku"
                    multiline
                    rowsMax="8"
                    value={this.state.newRateRateContent}
                    onChange={this.handleNewRate('newRateRateContent')}
                    margin="normal"
                    style={{
                      width: '50%',
                    }}
                  />
                  <Select
                    value={this.state.newRateRate}
                    onChange={this.handleNewRate('newRateRate')}
                    style={{
                      width: '50%',
                    }}
                  >
                    <MenuItem value="" />
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Select>
                  <span className="addRateButton" onClick={this.addComment}>
                    Dodaj ocenę
                  </span>
                </div>
              )}
              {currentUser.rates &&
                currentUser.rates.map((rate, index) => (
                  <UserRateComponent rate={rate} key={index} />
                ))}
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
