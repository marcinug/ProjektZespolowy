import React, { Component }  from 'react';
import '../LoginComponent/LoginComponent.css';
import { Button, Card, TextField } from '@material-ui/core';

class SignUp extends Component {
  state = {
    email: '',
    password: '',
    firstName: '',
    lastName: ''
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
            label="Imie" 
            variant="filled" 
            onChange={this.handleChange}
            id="firstName"
          />
          <TextField 
            label="Nazwisko" 
            variant="filled" 
            onChange={this.handleChange}
            id="lastName"
          />
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
            Rejestruj
          </Button>
          
        </Card>
      </div>
    );
  }
}

export default SignUp;