import React from 'react';
import * as moment from 'moment';
import './SinglePostComponent.css';

const SinglePostComponent = ({ post }) => (
  <div className={post.type === 'need' ? 'singlePost need' : 'singlePost give'}>
    <div className="postHeading">
      <div />
      <div className="postHeading__heading">{post.heading}</div>
      <div>{moment(post.created).format('DD.MM.YYYY, hh:mm')}</div>
    </div>
    <div className="postDescription">{post.description}</div>
    <div className="postDescription" />
  </div>
);

export default SinglePostComponent;
