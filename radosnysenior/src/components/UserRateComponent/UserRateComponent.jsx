import React from 'react';
import * as moment from 'moment';
import { Link, withRouter } from 'react-router-dom';
import './UserRateComponent.css';
import { Paper } from '@material-ui/core';
import _ from 'lodash';
import StarComponent from '../StarComponent/StarComponent';

const UserRateComponent = ({ rate }) => (
  <Paper className="userRateComment">
    <div className="userRateContainer">
      <div className="rateDateCreated">
        <Link to={`/users/${rate.addedBy}`} className="reactRouterBlueLink">
          {rate.addedBy}
        </Link>
        ; {moment(rate.created).format('DD.MM.YYYY, HH:mm')}
      </div>
      <div className="rateContent">
        {_.times(rate.rate, i => (
          <StarComponent size="24px" color="#FFDA44" key={i} />
        ))}
        {_.times(5 - rate.rate, i => (
          <StarComponent size="24px" color="black" key={i} />
        ))}
      </div>
      <div className="rateContent">{rate.content}</div>
    </div>
  </Paper>
);

export default withRouter(UserRateComponent);
