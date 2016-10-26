import React from 'react';
import { Route } from 'react-router';

import App from 'modules/App/App';
import NewQuizForm from 'modules/NewQuizForm/NewQuizForm';

module.exports = (
  <div>
    <Route path="/" component={App} />
    <Route path="/create" component={NewQuizForm} />
  </div>
);
