'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import { ipcRenderer } from 'electron';

let lastProject = '';

const Status = React.createClass({
  getInitialState: function() {
    return {
      project: '',
      task: '',
      running: false
    };
  },

  componentDidMount: function() {
    setInterval(() => {
      ipcRenderer.send('get-status', 'ping');
    }, 250);

    ipcRenderer.on('current-status', (event, data) => {
      const status = JSON.parse(data);
      if (status.project !== lastProject) {
        this.setState({
          project: status.project,
          task: status.task,
          running: status.running
        });

        lastProject = status.project;
      }
    });
  },

  stateClass: function() {
    console.log(this.state.running);
    return this.state.running ? 'state-running' : 'state-stopped';
  },

  render: function() {
    console.log(this.state);
    const iconClass = `project-state state-${this.state.running ? 'running' : 'stopped'}`;

    return (
      <div>
        <i className={iconClass}></i>
        <h1 className="project-name">{this.state.project}</h1>
        <h2 className="project-task">{this.state.task}</h2>
      </div>
    );
  }
});

export default Status;
