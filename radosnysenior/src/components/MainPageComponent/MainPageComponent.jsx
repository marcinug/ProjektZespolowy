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
    type: '',
    province: '',
    filteredPosts: null,
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

  handleProvinceChange = name => event => {
    const chosenType = event.target.value;
    this.setState({ [name]: chosenType });

    if (chosenType === '') {
      if (this.state.type === '') {
        this.setState({ filteredPosts: null });
        this.parseData();
      } else {
        let posts = this.state.posts;
        const type = this.state.type;
        const filteredPosts = posts.filter(function(post) {
          return post['type'] === type;
        });
        this.setState({ filteredPosts: filteredPosts });
      }
    } else {
      let posts = this.state.posts;
      const type = this.state.type;
      let filteredPosts = posts.filter(function(post) {
        return post[name] === chosenType;
      });
      if (type !== '') {
        filteredPosts = filteredPosts.filter(function(post) {
          return post['type'] === type;
        });
        this.setState({ filteredPosts: filteredPosts });
      }
      this.setState({ filteredPosts: filteredPosts });
    }
  };

  handleTypeChange = name => event => {
    const chosenType = event.target.value;
    this.setState({ [name]: chosenType });
    if (chosenType === '') {
      if (this.state.province === '') {
        this.setState({ filteredPosts: null });
        this.parseData();
      } else {
        let posts = this.state.posts;
        const province = this.state.province;
        const filteredPosts = posts.filter(function(post) {
          return post['province'] === province;
        });
        this.setState({ filteredPosts: filteredPosts });
      }
    } else {
      let posts = this.state.posts;
      const province = this.state.province;
      let filteredPosts = posts.filter(function(post) {
        return post[name] === chosenType;
      });
      if (province !== '') {
        filteredPosts = filteredPosts.filter(function(post) {
          return post['province'] === province;
        });
        this.setState({ filteredPosts: filteredPosts });
      }
      this.setState({ filteredPosts: filteredPosts });
    }
  };

  componentWillUnmount() {
    if (unsubscribe) unsubscribe();
  }

  render() {
    const { posts, loading, filteredPosts } = this.state;
    return (
      <div className="mainContainer">
        <AppBarComponent />
        <Paper className="paperContainer">
          <div className="appContainer">
            <div className="mainPageHeading">
              <h1>Ogłoszenia</h1>
              <div className="mainPageFilters">
                <FormControl variant="filled" className="postTypeSelect">
                  <InputLabel htmlFor="filled-age-native-simple">
                    Typ postu
                  </InputLabel>
                  <Select
                    value={this.state.type}
                    onChange={this.handleTypeChange('type')}
                    inputProps={{
                      name: 'type',
                      id: 'type',
                    }}
                  >
                    <MenuItem value="" />
                    <MenuItem value="give">Pomogę</MenuItem>
                    <MenuItem value="need">Szukam pomocy</MenuItem>
                  </Select>
                </FormControl>
                <FormControl variant="filled" className="postTypeSelect">
                  <InputLabel htmlFor="filled-age-native-simple">
                    Województwo
                  </InputLabel>
                  <Select
                    value={this.state.province}
                    onChange={this.handleProvinceChange('province')}
                    inputProps={{
                      name: 'province',
                      id: 'province',
                    }}
                  >
                    <MenuItem value="" />
                    <MenuItem value="dolnośląskie">dolnośląskie</MenuItem>
                    <MenuItem value="kujawsko-pomorskie">
                      kujawsko-pomorskie
                    </MenuItem>
                    <MenuItem value="lubelskie">lubelskie</MenuItem>
                    <MenuItem value="lubuskie">lubuskie</MenuItem>
                    <MenuItem value="łódzkie">łódzkie</MenuItem>
                    <MenuItem value="małopolskie">małopolskie</MenuItem>
                    <MenuItem value="mazowieckie">mazowieckie</MenuItem>
                    <MenuItem value="opolskie">opolskie</MenuItem>
                    <MenuItem value="podkarpackie">podkarpackie</MenuItem>
                    <MenuItem value="podlaskie">podlaskie</MenuItem>
                    <MenuItem value="pomorskie">pomorskie</MenuItem>
                    <MenuItem value="śląskie">śląskie</MenuItem>
                    <MenuItem value="świętokrzyskie">świętokrzyskie</MenuItem>
                    <MenuItem value="warmińsko-mazurskie">
                      warmińsko-mazurskie
                    </MenuItem>
                    <MenuItem value="wielkopolskie">wielkopolskie</MenuItem>
                    <MenuItem value="zachodniopomorskie">
                      zachodniopomorskie
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
            {loading ? (
              <CircularProgress />
            ) : (
              <div>
                {filteredPosts
                  ? filteredPosts.map(post => (
                      <SinglePostComponent post={post} key={post.id} />
                    ))
                  : posts.map(post => (
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
