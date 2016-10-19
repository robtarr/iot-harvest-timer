'use strict';

import React from 'react';
import Task from './Task';

function _tasks(tasks) {
  return tasks.map((entry) => {
    return <Task name={entry.name}/>
  });
}

const Project = (props) => {
  return <option>{props.name}</option>
}

export default Project;
