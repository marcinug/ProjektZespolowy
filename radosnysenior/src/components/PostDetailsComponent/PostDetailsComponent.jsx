import React, { PureComponent } from 'react';
import * as moment from 'moment';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
import { withRouter } from 'react-router-dom';
import AppBarComponent from '../AppBarComponent/AppBarComponent';
import './PostDetailsComponent.css';
import { Paper, TextField } from '@material-ui/core';
import LoaderComponent from '../LoaderComponent/LoaderComponent';
import SingleCommentComponent from '../SingleCommentComponent/SingleCommentComponent';

const PostDetailsPage = () => <PostDetails />;

var unsubscribe = null;

class PostDetailsComponent extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      posts: [],
      currentPost: null,
      isUserLogged: false,
      postType: '',
      isCommentBoxVisible: false,
      comment: '',
    };
  }

  componentDidMount() {
    this.props.firebase.auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({ isUserLogged: true });
        this.setState({ currentUser: user.email });
      } else {
        this.props.history.push('/');
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
      this.setState({ posts });
      this.setState({ loading: false });
      const currentPost = posts.find(x => x.id === this.props.match.params.id);
      this.setState({ currentPost });
    });
  };

  handleSubmit = () => {
    this.props.handleSubmit(this.state);
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  addComment = () => {
    const fb = this.props.firebase;
    const currTime = moment().format();
    const comment = {
      addedBy: this.state.currentUser,
      created: currTime,
      content: this.state.comment,
    };
    fb.addComment(this.state.currentPost.id, [
      ...this.state.currentPost.comments,
      comment,
    ]);
    this.setState({
      comment: '',
    });
  };

  componentWillUnmount() {
    if (unsubscribe) unsubscribe();
  }

  toggleCommentVisible = () => {
    this.setState(prevState => ({
      isCommentBoxVisible: !prevState.isCommentBoxVisible,
    }));
  };

  render() {
    const { currentPost, loading } = this.state;
    return (
      <div className="mainContainer">
        <AppBarComponent />
        {loading ? (
          <LoaderComponent />
        ) : (
          currentPost && (
            <React.Fragment>
              <Paper
                style={{
                  marginLeft: '2%',
                  marginRight: '2%',
                  paddingBottom: 20,
                }}
                className="paperPostContainer"
              >
                <div className="appContainer">
                  <div className="mainPageHeading">
                    <h1>Ogłoszenie nr {currentPost.id}</h1>
                  </div>
                  <div className="postHeading">
                    <div />
                    <div className="postHeading__heading">
                      {currentPost.heading}
                    </div>
                    <div>
                      {moment(currentPost.created).format('DD.MM.YYYY, hh:mm')}
                    </div>
                  </div>
                  <div className="postDescription">
                    {currentPost.description}
                  </div>
                  <div className="postDescription">
                    {currentPost.longDescription}
                  </div>
                  <div className="contactInfo">
                    <a href={`mailto: ${currentPost.email}`}>
                      {currentPost.email}
                    </a>
                    <a href={`tel: ${currentPost.tel}`}>{currentPost.tel}</a>
                  </div>
                  <div className="addedBy">
                    <div>Dodane przez: {currentPost.addedBy}</div>
                  </div>
                </div>
                <svg
                  aria-hidden="true"
                  data-prefix="far"
                  data-icon="comment"
                  className="svg-inline--fa fa-comment fa-w-16 commentIcon"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  fontSize="15px"
                  onClick={() => this.toggleCommentVisible()}
                >
                  <path d="M256 32C114.6 32 0 125.1 0 240c0 47.6 19.9 91.2 52.9 126.3C38 405.7 7 439.1 6.5 439.5c-6.6 7-8.4 17.2-4.6 26S14.4 480 24 480c61.5 0 110-25.7 139.1-46.3C192 442.8 223.2 448 256 448c141.4 0 256-93.1 256-208S397.4 32 256 32zm0 368c-26.7 0-53.1-4.1-78.4-12.1l-22.7-7.2-19.5 13.8c-14.3 10.1-33.9 21.4-57.5 29 7.3-12.1 14.4-25.7 19.9-40.2l10.6-28.1-20.6-21.8C69.7 314.1 48 282.2 48 240c0-88.2 93.3-160 208-160s208 71.8 208 160-93.3 160-208 160z" />
                </svg>
              </Paper>
              <div className="commentsContaner">
                {this.state.isCommentBoxVisible && (
                  <React.Fragment>
                    <TextField
                      id="outlined-multiline-flexible"
                      label="Skomentuj"
                      multiline
                      rowsMax="8"
                      value={this.state.comment}
                      onChange={this.handleChange('comment')}
                      margin="normal"
                      style={{
                        width: '98%',
                      }}
                    />
                    <span
                      className="addCommentButton"
                      onClick={this.addComment}
                    >
                      Dodaj komentarz
                    </span>
                  </React.Fragment>
                )}
                {currentPost.comments &&
                  currentPost.comments.map((comment, index) => (
                    <SingleCommentComponent
                      comment={comment}
                      post={currentPost}
                      key={index}
                    />
                  ))}
              </div>
            </React.Fragment>
          )
        )}
      </div>
    );
  }
}

const PostDetails = compose(
  withFirebase,
  withRouter,
)(PostDetailsComponent);

export default PostDetailsPage;
