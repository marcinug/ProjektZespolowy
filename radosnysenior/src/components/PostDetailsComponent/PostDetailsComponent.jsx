import React, { PureComponent } from 'react';
import * as moment from 'moment';
import AppBarComponent from '../AppBarComponent/AppBarComponent';
import './PostDetailsComponent.css';
import { Paper } from '@material-ui/core';
import LoaderComponent from '../LoaderComponent/LoaderComponent';

class PostDetailsComponent extends PureComponent {
  render() {
    const { post, loading } = this.props;
    return (
      <div className="mainContainer">
        <AppBarComponent />

        {loading ? (
          <LoaderComponent />
        ) : (
          <Paper
            style={{ marginLeft: '2%', marginRight: '2%', paddingBottom: 20 }}
          >
            <div className="appContainer">
              <div className="mainPageHeading">
                <h1>Ogłoszenie nr {post.id}</h1>
              </div>
              <div className="postHeading">
                <div />
                <div className="postHeading__heading">{post.heading}</div>
                <div>{moment(post.created).format('DD.MM.YYYY, hh:mm')}</div>
              </div>
              <div className="postDescription">{post.description}</div>
              <div className="postDescription">{post.longDescription}</div>
              <div className="contactInfo">
                <a href={`mailto: ${post.email}`}>{post.email}</a>
                <a href={`tel: ${post.tel}`}>{post.tel}</a>
              </div>
            </div>
          </Paper>
        )}
      </div>
    );
  }
}

export default PostDetailsComponent;
