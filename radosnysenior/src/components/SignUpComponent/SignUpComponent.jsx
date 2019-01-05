import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import * as moment from 'moment';
import './SignUpComponent.css';
import { Button, Card, TextField } from '@material-ui/core';
import { withRouter, Link } from 'react-router-dom';

const SignInPage = () => <SignInForm />;

const INITIAL_STATE = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  about: '',
  rates: [],
  since: null,
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE, isUserLogged: true };
  }

  componentWillMount() {
    this.props.firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.props.history.push('/main');
      } else {
        this.setState({ isUserLogged: false });
        const currTime = moment().format();
        this.setState({ since: currTime });
      }
    });
  }

  onSubmit = event => {
    event.preventDefault();

    const {
      email,
      password,
      firstName,
      lastName,
      about,
      rates,
      since,
    } = this.state;

    const fb = this.props.firebase;

    const newUser = {
      firstName,
      lastName,
      email: email.toLowerCase(),
      about,
      rates,
      since,
    };

    fb.addUserToDatabase(newUser);

    fb.doCreateUserWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push('/main');
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error, firstName, lastName, about } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <div className="signUpContainer">
        <Card className="signUpCard">
          <form onSubmit={this.onSubmit} className="text-center">
            <TextField
              label="Imię"
              name="firstName"
              value={firstName}
              onChange={this.onChange}
              id="firstName"
            />
            <TextField
              label="Nazwisko"
              name="lastName"
              value={lastName}
              onChange={this.onChange}
              id="lastName"
            />
            <TextField
              label="E-mail"
              name="email"
              value={email}
              onChange={this.onChange}
              type="text"
              id="email"
            />
            <TextField
              label="Hasło"
              name="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={this.onChange}
              id="password"
            />
            <TextField
              id="outlined-multiline-flexible"
              label="O sobie"
              name="about"
              multiline
              rows="8"
              rowsMax="20"
              value={about}
              onChange={this.onChange}
              margin="normal"
            />
            <Button className="signUpButton" disabled={isInvalid} type="submit">
              Zarejestruj się
            </Button>
            <Link to="/" className="reactRouterLink">
              <Button className="backToLoginButton" color="primary">
                Mam konto - zaloguj się
              </Button>
            </Link>
            {error && <p className="text-error">{error.message}</p>}
          </form>
        </Card>
      </div>
    );
  }
}

const SignInForm = compose(
  withFirebase,
  withRouter,
)(SignInFormBase);

export default SignInPage;
