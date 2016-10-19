'use strict';

import { TimeTracking } from './harvest';
import { setMessage } from './status';
import { ipcMain } from 'electron';

let projects;

console.log('loading tasks');

function getTasks() {
  setMessage('Getting Projects List...');
  return new Promise((resolve, reject) => {
    if (!projects) {
      TimeTracking.daily({}, (err, tasks) => {
        if (err) reject(err);

        projects = tasks.projects;
        resolve(projects);
      });
    } else {
      resolve(projects);
    }
  });
}

function printTasks(name) {
  projects.forEach((project) => {
    setMessage(`${project.name}: ${project.id}`);
    project.tasks.forEach((entry) => {
      setMessage(`  ${entry.name}: ${entry.id}`);
    });
  });
}

ipcMain.on('get-projects', (event, arg) => {
  getTasks().then(() => {
    event.sender.send('projects-list', JSON.stringify(projects));
  });
});

export {
  getTasks,
  printTasks
}
