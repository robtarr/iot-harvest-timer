'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Project from './Project';
import { ipcRenderer } from 'electron';

const projects = document.getElementById('projects');

const ProjectList = React.createClass({
  options: function(projects) {
    if (this.state && typeof this.state.projects === 'object') {
      return this.state.projects.map((project) => {
        return <Project name={project.name} tasks={project.tasks}/>
      });
    }
  },

  componentDidMount: function() {
    ipcRenderer.send('get-projects', 'projects');
    ipcRenderer.on('projects-list', (e, data) => {
      this.setState({
        projects: JSON.parse(data)
      });
    });
  },

  render: function() {
    return (
      <label> Project List
        <select>
          {this.options()}
        </select>
      </label>
    );
  }
});

export default ProjectList;
