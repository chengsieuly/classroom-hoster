import React, { Component } from 'react';
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

  render() {
    return (
      <div>
        {this.state.data.map(({ title, description, questions }, i) => (
          <Quiz key={i} title={title} description={description} questions={questions} />
        ))}
      </div>
    );
  }
}
