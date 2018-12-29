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

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
});

class AddPostComponent extends PureComponent {
  state = {
    type: '',
    cost: '',
    price: '',
    firstName: '',
    lastName: '',
    email: '',
    heading: '',
    phoneNum: '',
    description: '',
  };

  handleSubmit = (e) => {
    console.log(e.target.value);
    e.preventDefault();
    // this.props.handleSubmit(this.state);
    console.log(this.state);
  };

  handleChange = name => event => {
    console.log(event.target.value);
    this.setState({
      [name]: event.target.value,
    });
  };

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
              <InputLabel className="selectInput" htmlFor="type">
                Typ ogłoszenia
              </InputLabel>
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
              <InputLabel className="selectInput" htmlFor="cost">
                Płatność
              </InputLabel>
              <Select
                value={this.state.cost}
                onChange={this.handleChange('cost')}
                inputProps={{
                  name: 'cost',
                  id: 'cost',
                }}
              >
                <MenuItem value="" />
                <MenuItem value="free">Wolontariat</MenuItem>
                <MenuItem value="paid">Płatne</MenuItem>
              </Select>
              {this.state.cost === 'paid' && (
                <TextField
                  id="standard-name"
                  label="Cena (PLN)"
                  value={this.state.price}
                  onChange={this.handleChange('price')}
                  margin="normal"
                  type="number"
                />
              )}
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
                id="outlined-multiline-flexible"
                label="Opis"
                multiline
                rows="8"
                rowsMax="20"
                value={this.state.description}
                onChange={this.handleChange('description')}
                margin="normal"
              />
              <span
                className="formSentButton"
                role="button"
                aria-hidden
                onClick={this.handleSubmit}
              >
                WYŚLIJ
              </span>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

export default AddPostComponent;
