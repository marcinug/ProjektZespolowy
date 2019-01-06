import React from 'react';
import * as moment from 'moment';
import { Link } from 'react-router-dom';
import './SingleEventComponent.css';

const SingleEventComponent = ({ event }) => (
  <Link to={`/events/${event.id}`} className="reactRouterLink">
    <div className="singleEvent">
      <div className="eventHeading">
        <div> {moment(event.date).format('DD.MM.YYYY, HH:mm')}</div>
        <div className="eventHeading__heading">{event.heading}</div>
        <div>{`${event.city}, ${event.province}`}</div>
      </div>
      <div className="eventDescription">{event.desc}</div>
      <div className="eventAddedBy">{`${event.addedBy};  ${moment(
        event.created,
      ).format('DD.MM.YYYY, HH:mm')}`}</div>
      <div className="participants">
        UCZESTNICY
        {event.participants
          ? ` (${event.participants.length}): ${event.participants.join(', ')}`
          : ': 0'}
      </div>
    </div>
  </Link>
);

export default SingleEventComponent;
