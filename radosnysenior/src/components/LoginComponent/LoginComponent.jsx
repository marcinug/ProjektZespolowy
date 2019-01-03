import React, { Component } from 'react';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import './LoginComponent.css';
import { Button, Card, TextField } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

const SignInPage = () => <SignInForm />;

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null,
};

class SignInFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE, isUserLogged: true };
  }

  componentWillMount() {
    this.props.firebase.auth.onAuthStateChanged(user => {
      console.log(user);
      if (user) {
        this.props.history.push('/main');
      } else {
        this.setState({ isUserLogged: false });
      }
    });
  }

  onSubmit = event => {
    event.preventDefault();

    const { email, password } = this.state;

    this.props.firebase
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push('/products');
      })
      .catch(error => {
        this.setState({ error });
      });
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { email, password, error, isUserLogged } = this.state;

    const isInvalid = password === '' || email === '';

    return (
      <div className="loginContainer">
        <Card className="loginCard">
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
            <Button color="primary" disabled={isInvalid} type="submit">
              Zaloguj
            </Button>
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
