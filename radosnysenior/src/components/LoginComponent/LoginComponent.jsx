import React, { Component }  from 'react';
import './LoginComponent.css';
import { Button, Card, TextField } from '@material-ui/core';

class LoginComponent extends Component {
  state = {
    email: '',
    password: ''
  }
  handleChange = (e) => {
    console.log(e.target.value);
    this.setState({
      [e.target.id]: e.target.value
    })
      
  }
  handleSubmit = (e) => {
      e.preventDefault();
      console.log(this.state);
  }

render() {
  return (
      <div className="loginContainer">
        <Card className="loginCard">
          <TextField 
            label="Użytkownik" 
            variant="filled" 
            onChange={this.handleChange}
            id="email"
          />
          <TextField
            label="Hasło"
            type="password"
            autoComplete="current-password"
            variant="filled"
            onChange={this.handleChange}
            id="password"
          />
          <Button 
            color="primary" 
            href="main"
            onChange={this.handleSubmit}
          >
            Zaloguj
          </Button>
          
        </Card>
      </div>
    );
  }
}

export default LoginComponent;
