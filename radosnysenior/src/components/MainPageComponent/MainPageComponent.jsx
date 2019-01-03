import React from 'react';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import FilledInput from '@material-ui/core/FilledInput';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import './MainPageComponent.css';
import AppBarComponent from '../AppBarComponent/AppBarComponent';
import SinglePostComponent from '../SinglePostComponent/SinglePostComponent';
import { Paper, CircularProgress } from '@material-ui/core';

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
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      posts: [],
      isUserLogged: false,
      postType: '',
    };
  }

  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ isUserLogged: true });
      } else {
        this.props.history.push('/signin');
      }
    });
    this.setState({ loading: true });
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
    this.setState({ [name]: event.target.value });
    console.log(this.state.postType);
  };

  componentWillUnmount() {
    if (unsubscribe) unsubscribe();
  }

  render() {
    const { posts, loading } = this.state;
    return (
      <div className="mainContainer">
        <AppBarComponent />
        <Paper
          style={{ marginLeft: '2%', marginRight: '2%', paddingBottom: 20 }}
        >
          <div className="appContainer">
            <div className="mainPageHeading">
              <h1>Ogłoszenia</h1>
              <FormControl variant="filled">
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
                  <option value="give">Pomogę</option>
                  <option value="need">Szukam pomocy</option>
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
