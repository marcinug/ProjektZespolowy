import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import './SignUpComponent.css';
import { Button, Card, TextField } from '@material-ui/core';
import { withRouter, Link } from 'react-router-dom';

const SignInPage = () => <SignInForm />;

const INITIAL_STATE = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  rates: [],
  since: null,
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE, isUserLogged: true };
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <div className="signUpContainer">
        <Card className="signUpCard">
          <form onSubmit={this.onSubmit} className="text-center">
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
            <Button className="signUpButton" disabled={isInvalid} type="submit">
              Zarejestruj się
            </Button>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
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
