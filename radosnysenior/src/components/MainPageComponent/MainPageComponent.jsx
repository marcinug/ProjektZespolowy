import React from 'react';
import PropTypes from 'prop-types';
import './MainPageComponent.css';

const MainPageComponent = ({ message }) => (
  <div className="mainContainer">{message}</div>
);

MainPageComponent.propTypes = {
  message: PropTypes.string.isRequired,
};

export default MainPageComponent;
