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

class PostDetails extends PureComponent {
  componentDidMount() {
    const { getCurrentId, fetchPost } = this.props;
    getCurrentId(this.props.match.params.id);
    fetchPost();
  }

  render() {
    const { currentPost, loading } = this.props;
    return (
      <React.Fragment>
        {currentPost && (
          <PostDetailsComponent post={currentPost} loading={loading} />
        )}
      </React.Fragment>
    );
  }
}

PostDetails.propTypes = {
  message: PropTypes.string,
  posts: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  currentPost: makeSelectCurrentPost(),
  loading: makeSelectLoading(),
});

const mapDispatchToProps = {
  getCurrentId,
  fetchPost,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostDetails);
