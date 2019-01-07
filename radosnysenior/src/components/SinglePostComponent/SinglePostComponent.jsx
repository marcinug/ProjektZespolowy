import React from 'react';
import * as moment from 'moment';
import { Link } from 'react-router-dom';
import './SinglePostComponent.css';

const SinglePostComponent = ({ post }) => (
  <Link to={`/posts/${post.id}`} className="reactRouterLink">
    <div
      className={post.type === 'need' ? 'singlePost need' : 'singlePost give'}
    >
      <div className="postHeading">
        <div className="emptyDiv" />
        <div className="postHeading__heading">{post.heading}</div>

        <div>{`${post.city}, ${post.province}`}</div>
      </div>
      <div className="postDescription">{post.description}</div>
      <div className="postAddedBy">{`${post.addedBy};  ${moment(
        post.created,
      ).format('DD.MM.YYYY, HH:mm')}`}</div>
    </div>
  </Link>
);

export default SinglePostComponent;
