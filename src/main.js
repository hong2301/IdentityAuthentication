const { app, BrowserWindow } = require('electron');
const path = require('path');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      // 启用预加载脚本
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true, // 保持上下文隔离（安全推荐）
      enableRemoteModule: false // 禁用远程模块（Electron 12+ 默认禁用）
    }
  });

  win.loadFile('src/renderer/dist/index.html');
};


app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
