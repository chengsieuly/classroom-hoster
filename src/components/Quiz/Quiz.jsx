import React, { PropTypes } from 'react';

const Quiz = ({ description, host, questions, quizId, title }) => (
  <div>
    <h3>{title}</h3>
    <p>{description}</p>
    {questions.map((question, i) => <h4 key={i}>{question}</h4>)}
    <button className="btn btn-secondary" onClick={host.bind(this, quizId)}>Host</button>
  </div>
);

Quiz.propTypes = {
  description: PropTypes.string,
  host: PropTypes.func,
  questions: PropTypes.array,
  quizId: PropTypes.string,
  title: PropTypes.string,
};

export default Quiz;
