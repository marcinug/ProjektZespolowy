import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import MainPageComponent from '../../components/MainPageComponent/MainPageComponent';

import { fetchPosts } from './MainPageActions';
import { makeSelectHelloMessage, makeSelectPosts } from './MainPageSelectors';

class MainPage extends PureComponent {
  componentDidMount() {
    this.props.fetchPosts();
  }
  render() {
    const { posts } = this.props;
    console.log(this.props);
    return (
      <React.Fragment>
        {!!posts && (
          <div>
            <MainPageComponent posts={posts} />
          </div>
        )}
      </React.Fragment>
    );
  }
}

MainPage.propTypes = {
  message: PropTypes.string,
  posts: PropTypes.array,
};

// const mapStateToProps = createStructuredSelector({
//   exampleMessage: makeSelectHelloMessage(),
//   posts: makeSelectPosts(),
//   // post: state.post.posts
// });

const mapStateToProps = (state) => {
  console.log(state);
  return {
    posts: state.firestore.ordered.posts
  }
}

const mapDispatchToProps = {
  fetchPosts,
};

export default compose( 
    connect(
      mapStateToProps,
      mapDispatchToProps,
    ),
    firestoreConnect([
      { collection : 'posts'}
    ])
  )
(MainPage);
