'use strict';

const env = process.env.NODE_ENV;
const shell = require('shelljs');

if (env === 'production') {
  console.log('Starting production...');
  shell.exec('webpack && electron .');
} else {
  console.log('Starting development...');
  shell.exec('concurrently --kill-others "webpack --watch --color" "electron . --color"');
}
