import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PostDetailsComponent from '../../components/PostDetailsComponent/PostDetailsComponent';
import PropTypes from 'prop-types';
import { getCurrentId, fetchPost } from './PostDetailsActions';
import { makeSelectCurrentPost } from './PostDetailsSelectors';

class PostDetails extends PureComponent {
  componentDidMount() {
    this.props.getCurrentId(this.props.match.params.id);
    this.props.fetchPost();
    console.log(this.props.currentPost);
  }

  render() {
    const { currentPost } = this.props;
    return (
      <React.Fragment>
        {currentPost && <PostDetailsComponent post={currentPost} />}
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
});

const mapDispatchToProps = {
  getCurrentId,
  fetchPost,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PostDetails);
