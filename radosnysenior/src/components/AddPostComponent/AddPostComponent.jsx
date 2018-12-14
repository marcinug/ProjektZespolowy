import React, { PureComponent } from 'react';
import AppBarComponent from '../AppBarComponent/AppBarComponent';
import './AddPostComponent.css';
import {
  Paper,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';

class AddPostComponent extends PureComponent {
  state = {
    type: '',
    firstName: '',
    lastName: '',
    email: '',
    heading: '',
    phoneNum: '',
    description: '',
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    return (
      <div className="mainContainer">
        <AppBarComponent />
        <Paper
          style={{ marginLeft: '2%', marginRight: '2%', paddingBottom: 20 }}
        >
          <div className="appContainer">
            <div className="mainPageHeading">
              <h1>Dodaj post</h1>
            </div>
            <div className="addPostFormContainer">
              <InputLabel htmlFor="type">Typ ogłoszenia</InputLabel>
              <Select
                value={this.state.type}
                onChange={this.handleChange('type')}
                inputProps={{
                  name: 'type',
                  id: 'type',
                }}
              >
                <MenuItem value="" />
                <MenuItem value="oferuje">Oferuję pomoc</MenuItem>
                <MenuItem value="szukam">Szukam pomocy</MenuItem>
              </Select>
              <TextField
                id="standard-name"
                label="Imię"
                value={this.state.firstName}
                onChange={this.handleChange('firstName')}
                margin="normal"
              />
              <TextField
                id="standard-name"
                label="Nazwisko"
                value={this.state.lastName}
                onChange={this.handleChange('lastName')}
                margin="normal"
              />
              <TextField
                id="standard-name"
                label="Email"
                value={this.state.email}
                onChange={this.handleChange('email')}
                margin="normal"
                type="email"
              />
              <TextField
                id="standard-name"
                label="Nagłówek"
                value={this.state.heading}
                onChange={this.handleChange('heading')}
                margin="normal"
              />
              <TextField
                id="standard-name"
                label="Nr telefonu"
                value={this.state.phoneNum}
                onChange={this.handleChange('phoneNum')}
                margin="normal"
                type="number"
              />
              <TextField
                id="standard-name"
                label="Opis"
                value={this.state.description}
                onChange={this.handleChange('description')}
                margin="normal"
              />
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

export default AddPostComponent;
