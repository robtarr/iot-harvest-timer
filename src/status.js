import { ipcMain } from 'electron';

let currentStatus = {};

function setStatus(data) {
  Object.assign(currentStatus, data);

  console.log(`Setting status:`);
  console.log(data);
}

ipcMain.on('get-status', (event, arg) => {
  event.sender.send('current-status', JSON.stringify(currentStatus));
});

export {
  setStatus
};
