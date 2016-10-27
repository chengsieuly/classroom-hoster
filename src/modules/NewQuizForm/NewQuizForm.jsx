import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import Question from 'modules/NewQuizForm/Question/Question';

export default class NewQuizForm extends Component {
  constructor() {
    super();
    this.addNewQuestion = this.addNewQuestion.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.state = {
      title: '',
      description: '',
      questions: [],
    };
  }

  addNewQuestion() {
    const questions = this.state.questions.slice();
    questions.push('');
    this.setState({ questions });
  }

  handleChange(id, index, e) {
    if (id === 'question') {
      const questions = this.state.questions.slice();
      const value = e.target.value;
      questions[index] = value;
      this.setState({ questions });
    } else {
      const key = e.target.id;
      const value = e.target.value;
      this.setState({ [key]: value });
    }
  }

  handleFormSubmit(e) {
    const { title, description, questions } = this.state;
    if (!title || questions.length < 1) {
      // TODO: Error handling for form
    } else {
      fetch('http://localhost:3000/quiz', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({ title, description, questions }),
      })
        .then(() => {
          // TODO: Handle success
          browserHistory.push('/');
        })
        .catch(() => {
          // TODO: Error handling
        });
    }

    e.preventDefault();
  }

  render() {
    return (
      <form className="container" onSubmit={this.handleFormSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Title"
            onChange={this.handleChange.bind(this, null, null)}
            />
        </div>
        <div className="form-group">
          <label htmlFor="description">Desciption</label>
          <input
            type="text"
            className="form-control"
            id="description"
            placeholder="Description"
            onChange={this.handleChange.bind(this, null, null)}
            />
        </div>

        {this.state.questions.map((question, i) => (
          <Question
            key={i}
            index={i}
            update={this.handleChange.bind(this)}
            />
        ))}

        <button type="button" className="btn btn-secondary" onClick={this.addNewQuestion}>Add New Question</button>
        <button className="btn btn-primary">Save</button>
      </form>
    );
  }
}
