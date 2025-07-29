const { app, BrowserWindow } = require('electron');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      contextIsolation: true, // 保持上下文隔离（安全推荐）
      enableRemoteModule: false // 禁用远程模块（Electron 12+ 默认禁用）
    }
  });

  win.loadFile('src/renderer/dist/index.html');
};


app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    // MacOs-当用户点击 Dock 图标且没有其他打开的窗口时（比如关闭了所有窗口但应用还在运行）,会再次调用 createWindow() 创建一个新窗口
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  // MacOs-即使所有窗口关闭，应用通常也会继续运行（保持 Dock 图标可见），其他则直接退出
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
