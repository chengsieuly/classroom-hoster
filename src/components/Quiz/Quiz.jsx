import React, { PropTypes } from 'react';

const Quiz = ({ title, description, questions }) => (
  <div>
    <h3>{title}</h3>
    <p>{description}</p>
    {questions.map((question, i) => <h4 key={i}>{question}</h4>)}
  </div>
);

Quiz.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  questions: PropTypes.array,
};

export default Quiz;
