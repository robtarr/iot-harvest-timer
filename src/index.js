'use strict';

import menubar from 'menubar';
import cube from './cube';
import './tasks';

cube();

const mb = menubar({
  index: `file:///Users/Rob/my-projects/arduino/iot-timer/index.html`,
  height: 100
});

mb.on('ready', function ready () {
  console.log('app is ready');
});
