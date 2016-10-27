import React, { Component } from 'react';
import { Link } from 'react-router';
import Quiz from 'components/Quiz/Quiz';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
    };
  }

  componentWillMount() {
    fetch('http://localhost:3000/quiz')
      .then(data => data.json())
      .then(data => this.setState({ data }))
      .catch(err => {
        // TODO: Error handling
      });
  }

  host(id) {
    alert(`Student can now join ${window.location.host}/quiz/${id}`);
    window.location = `/host/${id}`;
  }

  render() {
    return (
      <div className="container">
        <Link to="/create" className="btn btn-primary">Create Quiz</Link>
        {this.state.data.map(({ id, title, description, questions }, i) => (
          <Quiz
            key={i}
            quizId={`${id}`}
            title={title}
            description={description}
            questions={questions}
            host={this.host}
            />
        ))}
      </div>
    );
  }
}
