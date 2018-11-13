import React from 'react';
import './LoginComponent.css';
import { Button, Card, TextField } from '@material-ui/core';

const LoginComponent = () => (
  <div className="loginContainer">
    <Card className="loginCard">
      <TextField label="Użytkownik" variant="filled" />
      <TextField
        label="Hasło"
        type="password"
        autoComplete="current-password"
        variant="filled"
      />
      <Button color="primary" href="main">
        Zaloguj
      </Button>
    </Card>
  </div>
);

export default LoginComponent;
