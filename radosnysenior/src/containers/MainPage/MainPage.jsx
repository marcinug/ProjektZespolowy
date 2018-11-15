import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import MainPageComponent from '../../components/MainPageComponent/MainPageComponent';

import { fetchMessage } from './MainPageActions';
import { makeSelectHelloMessage } from './MainPageSelectors';

class MainPage extends PureComponent {
  componentDidMount() {
    this.props.fetchMessage();
  }
  render() {
    const { exampleMessage } = this.props;
    return (
      <div>
        <MainPageComponent message={exampleMessage} />
      </div>
    );
  }
}

MainPage.propTypes = {
  message: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  exampleMessage: makeSelectHelloMessage(),
});

const mapDispatchToProps = {
  fetchMessage,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainPage);
