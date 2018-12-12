import React, { PureComponent } from 'react';
import AppBarComponent from '../AppBarComponent/AppBarComponent';
import './PostDetailsComponent.css';
import { Paper } from '@material-ui/core';

class PostDetailsComponent extends PureComponent {
  render() {
    const { post } = this.props;
    return (
      <div className="mainContainer">
        <AppBarComponent />
        <Paper
          style={{ marginLeft: '2%', marginRight: '2%', paddingBottom: 20 }}
        >
          <div className="appContainer">
            <div className="mainPageHeading">
              <h1>Ogłoszenie nr {post}</h1>
            </div>
          </div>
        </Paper>
      </div>
    );
  }
}

export default PostDetailsComponent;
