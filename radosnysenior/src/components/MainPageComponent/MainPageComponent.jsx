import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import './MainPageComponent.css';
import AppBarComponent from '../AppBarComponent/AppBarComponent';
import SinglePostComponent from '../SinglePostComponent/SinglePostComponent';
import { Paper } from '@material-ui/core';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

class MainPageComponent extends React.Component {
  state = {
    postType: '',
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  render() {
    const { classes, posts } = this.props;
    return (
      <div className="mainContainer">
        <AppBarComponent />
        <Paper
          style={{ marginLeft: '2%', marginRight: '2%', paddingBottom: 20 }}
        >
          <div className="appContainer">
            <div className="mainPageHeading">
              <h1>Ogłoszenia</h1>
              <FormControl variant="filled" className={classes.formControl}>
                <InputLabel htmlFor="filled-age-native-simple">
                  Typ postu
                </InputLabel>
                <Select
                  native
                  value={this.state.postType}
                  onChange={this.handleChange('postType')}
                  input={
                    <FilledInput
                      name="postType"
                      id="filled-age-native-simple"
                    />
                  }
                >
                  <option value={''} />
                  <option value={1}>Pomogę</option>
                  <option value={0}>Szukam pomocy</option>
                </Select>
              </FormControl>
            </div>
            {posts[0] && posts.map(post => <SinglePostComponent post={post} />)}
          </div>
        </Paper>
      </div>
    );
  }
}

MainPageComponent.propTypes = {
  posts: PropTypes.array.isRequired,
};

export default withStyles(styles)(MainPageComponent);
