const { ipcMain, net } = require('electron');
const request = require('../utils/request');

function getBusMsg(win) {
    ipcMain.on('getBusMsg', (sys, data) => {
        request(win, data);
    })
}

module.exports = { getBusMsg }