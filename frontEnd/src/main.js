
const { app, BrowserWindow, ipcMain } = require('electron');
const path = require('node:path');
const started = require('electron-squirrel-startup')

// 导入我们的处理器模块
const setupFileHandlers = require(path.join(__dirname, 'handlers', 'fileHandler.js'));
const setupSystemHandlers = require(path.join(__dirname, 'handlers', 'systemHandler.js'));


// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    fullscreen: true,
    frame: false, // This removes the standard window frame (title bar, borders, etc.)
    titleBarStyle: 'hidden', // For macOS specific styling
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadFile('src/renderer/dist/index.html');
  // and load the index.html of the app.
  //  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
  //    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  //  } else {
  //    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  //  }

  // Open the DevTools.
  //  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // 注册所有的 IPC 处理器
  setupFileHandlers(ipcMain);
  setupSystemHandlers(ipcMain);

  createWindow();

  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
