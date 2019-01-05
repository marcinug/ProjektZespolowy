import React from 'react';
import * as moment from 'moment';
import { Link } from 'react-router-dom';
import './SingleCommentComponent.css';
import { Paper } from '@material-ui/core';

const SingleCommentComponent = ({ comment }) => (
  <Paper className="singleCommentPaperContainer">
    <div className="singleCommentContainer">
      <div className="commentDateCreated">
        <Link to={`/users/${comment.addedBy}`} className="reactRouterBlueLink">
          {comment.addedBy}
        </Link>
        ; {moment(comment.created).format('DD.MM.YYYY, HH:mm')}
      </div>
      <div className="commentContent">{comment.content}</div>
    </div>
  </Paper>
);

export default SingleCommentComponent;
