import React, { PropTypes } from 'react';

const Quiz = ({ title, description }) => (
  <div>
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

Quiz.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
};

export default Quiz;
