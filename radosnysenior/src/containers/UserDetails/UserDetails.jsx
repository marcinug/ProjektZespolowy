import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import UserDetailsComponent from '../../components/UserDetailsComponent/UserDetailsComponent';
import PropTypes from 'prop-types';
import { getCurrentId, fetchUser } from './PostDetailsActions';
import {
  makeSelectCurrentUser,
  makeSelectLoading,
} from './PostDetailsSelectors';

class UserDetails extends PureComponent {
  componentDidMount() {
    const { getCurrentId, fetchUser } = this.props;
    getCurrentId(this.props.match.params.id);
    fetchUser();
  }

  render() {
    const { currentUser, loading } = this.props;
    return (
      <React.Fragment>
        {currentUser && (
          <UserDetailsComponent user={currentUser} loading={loading} />
        )}
      </React.Fragment>
    );
  }
}

UserDetails.propTypes = {
  message: PropTypes.string,
  posts: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  currentUser: makeSelectCurrentUser(),
  loading: makeSelectLoading(),
});

const mapDispatchToProps = {
  getCurrentId,
  fetchUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserDetails);
