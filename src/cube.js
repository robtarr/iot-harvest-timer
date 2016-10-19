'use strict';

import config from '../config/default.json';
import five from 'johnny-five';
import Particle from 'particle-io';
import { find } from 'lodash';
import { TimeTracking, isRunning } from './harvest';
import timers from '../config/timers.json';
import { orientation } from './gyro';
import { setStatus } from './status';

const board = new five.Board({
  io: new Particle({
    token: config.particle.token,
    deviceName: config.particle.deviceName
  })
});
const WAITFORCUBETOROTATE = 200;
let currentTimer;
let currentOrientation;
let timeout;


/** Look for `startTask` in the currently running timers for today
 * @param {Object} startTask Representing the current task (from `timers.json`)
 * @return {Promise} Resolves to the task from Harvest
 */
function getTask(startTask) {
  return new Promise((resolve, reject) => {
    TimeTracking.daily({}, (err, tasks) => {
      if (err) reject(err);

      let task = find(tasks.day_entries, function(entry) {
        return entry.project === startTask.name;
      });

      resolve(task);
    });
  });
}

/**
 *  Start an existing timer
 *  @param {Object} task Representing the task to start
 */
function startTimer(task) {
  if (!task.project_id) {
    setStatus({ message: 'No project_id found' });
    return;
  }

  if (!isRunning(task)) {
    TimeTracking.toggleTimer(task, function(err, data) {
      if (err) {
        console.log(err);
        return;
      }

      if (isRunning(data)) {
        setStatus({
          project: data.project,
          task: data.task,
          running: true
        });
      }
    });
  } else {
    setStatus({ message: 'Timer was already running' });
  }
}

/**
 *  Stop an existing timer
 *  @param {Object} task Representing the task to stop
 */
function stopTimer(task) {
  if (task && !task.project_id) {
    setStatus({ message: 'No project_id found' });
    return;
  }

  if (isRunning(task)) {
    TimeTracking.toggleTimer(task, function(err, data) {
      if (err) {
        console.log(err);
        return;
      }

      if (!isRunning(data)) {
        setStatus({
          project: data.project,
          task: data.task,
          running: false
        });
      }
    });
  } else {
    setStatus({ message: 'Timer was already stopped'});
  }
}

/**
 *  Create a new timer
 *  @param    {Object} task Represents the task to start (from `timers.json`)
 */
function newTimer(task) {
  let date = new Date(),
      formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

  setStatus(`message`, `Starting new timer for ${task.name}`);
  TimeTracking.create({
    project_id: task.projectId,
    task_id: task.taskId,
    spent_at: formattedDate
  }, function(err) {
    if (err) {
      console.log(err.error);
      return;
    }

    setStatus({
      project: task.project,
      task: task.name,
      running: true
    });
  });
}

/**
 *  Start a timer for the given task
 *  @memberof
 *  @param    {String} position - representing one of the tasks in the json file to start
 */
function trigger(position) {
  const startTask = timers[position];

  setStatus({ message: `Triggering side ${position}`});
  if (!!startTask) {
    getTask(startTask).then((task) => {
      if (task) {
        startTimer(task);
        currentTimer = task;
      } else {
        newTimer(startTask);
      }
    });
  } else {
    stopTimer(currentTimer);
  }
}

function go() {
  setStatus({ message: 'Looking for Harvest Cube...' });

  board.on('ready', function() {
    var accelerometer = new five.Accelerometer({
      controller: 'MPU6050',
      sensitivity: 100
    });

    accelerometer.on('orientation', function() {
      let newOrientation = orientation(this);

      if (newOrientation !== currentOrientation) {
        clearTimeout(timeout);
        timeout = setTimeout(function() {
          currentOrientation = newOrientation;
          trigger(currentOrientation);
        }, WAITFORCUBETOROTATE);
      }
    });
    setStatus({ message: '◻️  Harvest Cube found and ready...' });
  });
}

export default go;
