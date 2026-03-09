import React from 'react';
import { Link } from 'react-router-dom';
import './AssignmentCard.scss';

const AssignmentCard = ({ data }) => {
  const diffClass = `badge--${data.difficulty.toLowerCase()}`;
  
  return (
    <div className="assignment-card">
      <div className="assignment-card__header">
        <h3 className="assignment-card__title">{data.title}</h3>
        <span className={`badge ${diffClass}`}>{data.difficulty}</span>
      </div>
      <p className="assignment-card__desc">{data.description}</p>
      <div className="assignment-card__footer">
        <Link to={`/assignment/${data._id}`} className="btn">
          Start Challenge
        </Link>
      </div>
    </div>
  );
};

export default AssignmentCard;
