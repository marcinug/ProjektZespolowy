import React from 'react';
import PropTypes from 'prop-types';
import './MainPageComponent.css';
import AppBarComponent from '../AppBarComponent/AppBarComponent';

const MainPageComponent = ({ message }) => (
  <div className="mainContainer">
    <AppBarComponent />
    {message}
  </div>
);

MainPageComponent.propTypes = {
  message: PropTypes.string.isRequired,
};

export default MainPageComponent;
