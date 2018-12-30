import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PostDetailsComponent from '../../components/PostDetailsComponent/PostDetailsComponent';
import PropTypes from 'prop-types';
import { getCurrentId, fetchPost } from './PostDetailsActions';
import {
  makeSelectCurrentPost,
  makeSelectLoading,
} from './PostDetailsSelectors';
import { Link } from 'react-router-dom';

import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';


class PostDetails extends PureComponent {
  // componentDidMount() {
  //   const { getCurrentId, fetchPost } = this.props;
  //   getCurrentId(this.props.match.params.id);
  //   fetchPost();
  // }
  
  render() {
    const { currentPost, loading, posts} = this.props;
    console.log(this.props);
    console.log("Test PostDetails")
    const id = this.props.match.params.id;
    console.log(id);
    return (
      <React.Fragment>
        { posts && posts.map(post => {
          return (
            <Link to={'/posts/' + post.id } key={post.id}>
          {/* {currentPost && ( */}
            <PostDetailsComponent post={post} key={post.id} loading={loading} />
          {/* )} */}
          </Link>
          )
        })
        }
      </React.Fragment>
    );
  }
}

// PostDetails.propTypes = {
//   message: PropTypes.string,
//   posts: PropTypes.array,
// };

// const mapStateToProps = createStructuredSelector({
//   currentPost: makeSelectCurrentPost(),
//   loading: makeSelectLoading(),
// });

const mapStateToProps = (state, ownProps) => {
  console.log(state);
  
  const id = ownProps.match.params.id;
  const posts = state.firestore.data.posts;
  const post = posts ? posts[id] : null ;
  return {
    post: post
  }
}

const mapDispatchToProps = {
  getCurrentId,
  fetchPost,
};

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps,
// )(PostDetails);

export default compose(
  connect(mapStateToProps),
  firestoreConnect([
    { collection: 'posts'}
  ])
)(PostDetailsComponent);