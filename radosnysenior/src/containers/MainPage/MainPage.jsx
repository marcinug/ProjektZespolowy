import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import MainPageComponent from '../../components/MainPageComponent/MainPageComponent';

import { fetchPosts } from './MainPageActions';
import { makeSelectHelloMessage, makeSelectPosts } from './MainPageSelectors';

class MainPage extends PureComponent {
  componentDidMount() {
    this.props.fetchPosts();
  }
  render() {
    const { posts } = this.props;
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

const mapStateToProps = createStructuredSelector({
  exampleMessage: makeSelectHelloMessage(),
  posts: makeSelectPosts(),
});

const mapDispatchToProps = {
  fetchPosts,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainPage);
