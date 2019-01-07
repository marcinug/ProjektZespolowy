import React from 'react';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import './MainPageComponent.css';
import AppBarComponent from '../AppBarComponent/AppBarComponent';
import SinglePostComponent from '../SinglePostComponent/SinglePostComponent';
import {
  Paper,
  CircularProgress,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@material-ui/core';

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

const PostsPage = () => <PostsList />;

var unsubscribe = null;

class PostsListBase extends React.Component {
  state = {
    loading: false,
    posts: [],
    postType: '',
  };

  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(user => {
      if (user) {
      } else {
        this.props.history.push('/');
      }
    });
    this.parseData();
  }

  parseData = () => {
    let posts = [];
    let fb = this.props.firebase;
    unsubscribe = fb.allPosts().onSnapshot(querySnapshot => {
      posts = [];
      querySnapshot.forEach(doc => {
        posts.push(Object.assign({ id: doc.id }, doc.data()));
      });
      posts.sort(function(a, b) {
        return new Date(b.created) - new Date(a.created);
      });
      this.setState({ posts });
      this.setState({ loading: false });
    });
  };

  handleChange = name => event => {
    const chosenType = event.target.value;
    this.setState({ [name]: chosenType });

    if (chosenType === '') {
      this.parseData();
    } else {
      let posts = this.state.posts;
      const filteredPosts = posts.filter(function(post) {
        return post.type === chosenType;
      });
      this.setState({ posts: filteredPosts });
    }
  };

  componentWillUnmount() {
    if (unsubscribe) unsubscribe();
  }

  render() {
    const { posts, loading } = this.state;
    return (
      <div className="mainContainer">
        <AppBarComponent />
        <Paper className="paperContainer">
          <div className="appContainer">
            <div className="mainPageHeading">
              <h1>Ogłoszenia</h1>
              <FormControl variant="filled" className="postTypeSelect">
                <InputLabel htmlFor="filled-age-native-simple">
                  Typ postu
                </InputLabel>
                <Select
                  value={this.state.postType}
                  onChange={this.handleChange('postType')}
                  inputProps={{
                    name: 'postType',
                    id: 'postType',
                  }}
                >
                  <MenuItem value={''} />
                  <MenuItem value="give">Pomogę</MenuItem>
                  <MenuItem value="need">Szukam pomocy</MenuItem>
                </Select>
              </FormControl>
            </div>
            {loading ? (
              <CircularProgress />
            ) : (
              <div>
                {posts.map(post => (
                  <SinglePostComponent post={post} key={post.id} />
                ))}
              </div>
            )}
          </div>
        </Paper>
      </div>
    );
  }
}

const PostsList = compose(
  withFirebase,
  withRouter,
)(PostsListBase);

export default withStyles(styles)(PostsPage);
