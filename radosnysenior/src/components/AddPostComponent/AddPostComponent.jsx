import React, { PureComponent } from 'react';
import AppBarComponent from '../AppBarComponent/AppBarComponent';
import './AddPostComponent.css';
import { Paper } from '@material-ui/core';

class AddPostComponent extends PureComponent {
  render() {
    return (
      <div className="mainContainer">
        <AppBarComponent />
        <Paper
          style={{ marginLeft: '2%', marginRight: '2%', paddingBottom: 20 }}
        >
          <div className="appContainer">
            <div className="mainPageHeading">
              <h1>Dodaj post</h1>
            </div>
            HELLO
          </div>
        </Paper>
      </div>
    );
  }
}

export default AddPostComponent;
