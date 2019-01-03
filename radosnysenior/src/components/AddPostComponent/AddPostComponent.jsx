import React, { PureComponent } from 'react';
import * as moment from 'moment';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import AppBarComponent from '../AppBarComponent/AppBarComponent';
import './AddPostComponent.css';
import {
  Paper,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from '@material-ui/core';

const AddPostPage = () => <AddPost />;

var unsubscribe = null;

class AddPostComponent extends PureComponent {
  state = {
    addedBy: '',
    comments: [],
    type: '',
    cost: '',
    price: '',
    email: '',
    heading: '',
    tel: '',
    description: '',
  };

  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(user => {
      if (user) {
        const currTime = moment().format();
        this.setState({ addedBy: user.email });
        this.setState({ created: currTime });
      } else {
        this.props.history.push('/');
      }
    });
  }

  handleSubmit = () => {
    let fb = this.props.firebase;
    fb.addPost(this.state);
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  componentWillUnmount() {
    if (unsubscribe) unsubscribe();
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
              <TextField
                id="standard-name"
                label="Nagłówek"
                value={this.state.heading}
                onChange={this.handleChange('heading')}
                margin="normal"
              />
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
                <MenuItem value="give">Oferuję pomoc</MenuItem>
                <MenuItem value="need">Szukam pomocy</MenuItem>
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
                label="Email"
                value={this.state.email}
                onChange={this.handleChange('email')}
                margin="normal"
                type="email"
              />
              <TextField
                id="standard-name"
                label="Nr telefonu"
                value={this.state.tel}
                onChange={this.handleChange('tel')}
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

const AddPost = compose(
  withFirebase,
  withRouter,
)(AddPostComponent);

export default AddPostPage;
