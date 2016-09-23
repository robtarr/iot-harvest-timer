'use strict';

import Harvest from 'harvest';
import config from '../config/default.json';

const harvest = new Harvest({
        subdomain: config.harvest.subdomain,
        email: config.harvest.email,
        password: config.harvest.password
      });
const TimeTracking = harvest.TimeTracking;

function isRunning(timer) {
  return !!timer.timer_started_at;
}

export default harvest;
export {
  TimeTracking,
  isRunning
}
