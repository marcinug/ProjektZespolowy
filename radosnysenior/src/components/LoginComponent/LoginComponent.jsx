import React from 'react';
import PropTypes from 'prop-types';
import './LoginComponent.css';
import { Button, Card, TextField } from '@material-ui/core';

const ExampleComponent = ({ message }) => (
  <div className="loginContainer">
    <Card className="loginCard">
      <TextField label="Użytkownik" variant="filled" />
      <TextField
        label="Hasło"
        type="password"
        autoComplete="current-password"
        variant="filled"
      />
      <Button href="main">Zaloguj</Button>
    </Card>
  </div>
);

ExampleComponent.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ExampleComponent;
