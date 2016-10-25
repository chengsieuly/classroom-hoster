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
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div>
        {this.state.data.map(({ title, description }, i) => (
          <Quiz key={i} title={title} description={description} />
        ))}
      </div>
    );
  }
}
