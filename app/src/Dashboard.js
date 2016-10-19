'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Status from './Status';
import Message from './Message';
import { Link } from 'react-router';

const Dashboard = (props) => {
  return (
    <div>
      <Status/>
      <Message/>

    </div>
  );

  // <Link to={`/settings`}>Settings</Link>
}

export default Dashboard;
