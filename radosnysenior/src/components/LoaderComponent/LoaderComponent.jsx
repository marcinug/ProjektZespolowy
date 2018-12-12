import React from 'react';
import { CircularProgress } from '@material-ui/core';
import './LoaderComponent.css';

const LoaderComponent = () => (
  <div className="loaderContainer">
    <CircularProgress size={50} />
  </div>
);

export default LoaderComponent;
