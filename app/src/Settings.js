'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import ProjectList from './ProjectList';
import { Link } from 'react-router';

const Settings = (props) => {
  return (
    <div>
      <h1>Settings</h1>
      <ProjectList/>

      <Link to={`/`}>Home</Link>
    </div>
  );
}

export default Settings;
