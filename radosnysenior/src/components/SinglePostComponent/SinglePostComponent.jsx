import React from 'react';
import * as moment from 'moment';
import { Link } from 'react-router-dom';
import './SinglePostComponent.css';

const SinglePostComponent = ({ post }) => (
  <Link to={`/posts/${post.id}`} style={{ textDecoration: 'none' }}>
    <div
      className={post.type === 'need' ? 'singlePost need' : 'singlePost give'}
    >
      <div className="postHeading">
        <div />
        <div className="postHeading__heading">{post.heading}</div>
        <div>{`${post.addedBy};  ${moment(post.created).format(
          'DD.MM.YYYY, HH:mm',
        )}`}</div>
      </div>
      <div className="postDescription">{post.description}</div>
      <div className="postDescription" />
    </div>
  </Link>
);

export default SinglePostComponent;
