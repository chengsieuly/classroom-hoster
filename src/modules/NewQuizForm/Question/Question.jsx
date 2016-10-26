import React, { PropTypes } from 'react';

const Question = ({ index, update }) => (
  <div className="form-group">
    <label htmlFor="question">Question {index + 1}</label>
    <textarea
      className="form-control"
      id="question"
      rows="3"
      onChange={update.bind(this, 'question', index)}
      />
  </div>
);

Question.propTypes = {
  index: PropTypes.number,
  update: PropTypes.func,
};

export default Question;
