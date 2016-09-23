'use strict';

import { TimeTracking } from './harvest';

function getTask(name) {
  console.log('Getting Tasks...');
  TimeTracking.daily({}, (err, tasks) => {
    if (err) reject(err);

    tasks.projects.forEach((project) => {
      console.log(`${project.name}: ${project.id}`);
      project.tasks.forEach((entry) => {
        console.log(`  ${entry.name}: ${entry.id}`);
      });
    });
  });
}

getTask();
