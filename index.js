'use strict';

const Harvest = require('harvest');
const harvest = new Harvest({
        subdomain: config.harvest.subdomain,
        email: config.harvest.email,
        password: config.harvest.password
      });
const TimeTracking = harvest.TimeTracking;
const timers = require('./config/timers.json');

TimeTracking.daily({}, function(err, tasks) {
    if (err) throw new Error(err);

// work with tasks
});
