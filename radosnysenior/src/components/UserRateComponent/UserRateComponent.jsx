import React from 'react';
import * as moment from 'moment';
import { Link } from 'react-router-dom';
import './UserRateComponent.css';
import { Paper } from '@material-ui/core';

const UserRateComponent = ({ rate }) => (
  <Paper style={{ borderRadius: '20px', margin: '0 5%' }}>
    <div className="userRateContainer">
      <div className="rateDateCreated">
        <Link
          to={`/users/${rate.addedBy}`}
          style={{ textDecoration: 'none', color: 'blue' }}
        >
          {rate.addedBy}
        </Link>
        ; {moment(rate.created).format('DD.MM.YYYY, HH:mm')}
      </div>
      <div className="rateContent">{rate.content}</div>
    </div>
  </Paper>
);

export default UserRateComponent;
