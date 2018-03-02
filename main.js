const electron = require('electron');
const { app } = electron;
const path = require('path');
const url = require('url');

app.on('ready', () => {
  let win = new electron.BrowserWindow({
    width: 300,
    height: 180,
    icon: path.join(__dirname, 'assets', 'icon128x128.png'),
    show: false,
    resizable: false,
    maximizable: false
  });
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));
  win.on('ready-to-show', () => {
    win.show();
    setInterval(() => {
      let time = new Date().toLocaleTimeString();
      win.webContents.send('time', time);
    }, 1000);
  });
  win.on('closed', () => {
    win = null;
    app.quit();
  });
});
