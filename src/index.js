'use strict';

import menubar from 'menubar';
import cube from './cube';
import './tasks';

const mb = menubar({
  index: `file:///Users/Rob/my-projects/arduino/iot-timer/index.html`,
  height: 100,
  icon: 'img/Sugar_Cube_icon.png'
});

cube(mb);

mb.on('ready', function ready () {
  console.log('app is ready');
});
