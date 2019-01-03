import React from 'react';
import * as moment from 'moment';
import './SingleCommentComponent.css';
import { Paper } from '@material-ui/core';

const SingleCommentComponent = ({ comment }) => (
  <Paper style={{ borderRadius: '20px' }}>
    <div className="singleCommentContainer">
      <div className="commentDateCreated">
        {`${comment.addedBy}; ${moment(comment.created).format(
          'DD.MM.YYYY, HH:mm',
        )}`}
      </div>
      <div className="commentContent">{comment.content}</div>
    </div>
  </Paper>
);

export default SingleCommentComponent;
