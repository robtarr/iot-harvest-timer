import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';

import Dashboard from './Dashboard';
import Settings from './Settings';

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={Dashboard} />
    <Route path="/settings" component={Settings} />
  </Router>
), document.getElementById('app'))
