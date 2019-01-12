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
        this.setState({ loggedUser: user.email });
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

  addRate = () => {
    const fb = this.props.firebase;
    const currTime = moment().format();
    const rate = {
      addedBy: this.state.loggedUser,
      created: currTime,
      content: this.state.newRateRateContent,
      rate: this.state.newRateRate,
    };
    fb.addNewUserRate(this.state.currentUser.id, [
      ...this.state.currentUser.rates,
      rate,
    ]);
    this.toggleCommentVisible();
  };

  render() {
    const { currentUser, loading, userRating, loggedUser } = this.state;
    return (
      <div className="mainContainer">
        <AppBarComponent />
        {loading ? (
          <LoaderComponent />
        ) : (
          currentUser && (
            <React.Fragment>
              <Paper className="paperContainer paperPostContainer">
                <div className="userDetailsContainer">
                  <h1 className="currenUserH1">
                    Użytkownik: {currentUser.email}
                  </h1>
                  <h2 className="currenUserH2">
                    Imię: {currentUser.firstName}
                  </h2>
                  <h2 className="currenUserH2">
                    Nazwisko: {currentUser.lastName}
                  </h2>
                  <h2 className="currenUserH2">
                    Na portalu od:{' '}
                    {moment(currentUser.since).format('DD.MM.YYYY, HH:mm')}
                  </h2>
                  <h2 className="currenUserH2">
                    Email:{' '}
                    <a
                      className="currentUserMail"
                      href={`mailto: ${currentUser.email}`}
                    >
                      {currentUser.email}
                    </a>
                  </h2>
                  <h2 className="currenUserH2 aboutUser">
                    O sobie: {currentUser.about}
                  </h2>
                  {_.times(userRating, i => (
                    <StarComponent size="48px" color="#FFDA44" key={i} />
                  ))}
                  {_.times(5 - userRating, i => (
                    <StarComponent size="48px" color="black" key={i} />
                  ))}
                </div>
                {!currentUser.rates
                  .map(arr => arr.addedBy)
                  .includes(loggedUser) &&
                  loggedUser !== currentUser.email && (
                    <span
                      className="rateButton"
                      role="button"
                      aria-hidden
                      onClick={() => this.toggleCommentVisible()}
                    >
                      OCEŃ
                    </span>
                  )}
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
                    className="rateOtherUserInput"
                  />
                  <Select
                    value={this.state.newRateRate}
                    onChange={this.handleNewRate('newRateRate')}
                    className="rateOtherUserInput"
                  >
                    <MenuItem value="" />
                    <MenuItem value={1}>1</MenuItem>
                    <MenuItem value={2}>2</MenuItem>
                    <MenuItem value={3}>3</MenuItem>
                    <MenuItem value={4}>4</MenuItem>
                    <MenuItem value={5}>5</MenuItem>
                  </Select>
                  <span className="addRateButton" onClick={this.addRate}>
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
