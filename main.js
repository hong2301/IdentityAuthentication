// 导入所需的 Electron 模块和 Node.js 核心模块
const { app, BrowserWindow, ipcMain, contextBridge } = require('electron');
const path = require('path');
const fs = require('fs');

/**
 * 创建浏览器窗口函数
 * 这是应用的主窗口，将加载 index.html 文件
 */
const createWindow = () => {
  // 创建新的浏览器窗口实例
  const win = new BrowserWindow({
    width: 800,   // 窗口初始宽度
    height: 600,  // 窗口初始高度
    webPreferences: {
      // 指定预加载脚本路径（用于安全地暴露API到渲染进程）
      preload: path.join(__dirname, 'preload.js'),

      // 启用上下文隔离（安全最佳实践，防止渲染进程直接访问Node.js API）
      contextIsolation: true,

      // 禁用远程模块（Electron 12+ 默认禁用，增强安全性）
      enableRemoteModule: false
    }
  });

  // 加载应用的入口HTML文件
  win.loadFile('index.html');
};

/**
 * Electron 应用生命周期管理
 * 当 Electron 完成初始化后触发
 */
app.whenReady().then(() => {
  // 应用准备就绪后创建主窗口
  createWindow();

  /**
   * macOS 特殊处理：当点击dock图标且没有其他窗口打开时，
   * 重新创建应用窗口（macOS应用通常在没有窗口时仍保持运行）
   */
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

/**
 * 窗口关闭事件处理
 * 非 macOS 平台在所有窗口关闭时退出应用
 * macOS 通常保持应用运行直到用户明确退出（Cmd+Q）
 */
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {  // darwin 是 macOS 的系统名称
    app.quit();
  }
});

// 注意：代码中加载了 grayscale 原生模块但未使用
// 实际使用时需要确保该模块已正确编译并放置在指定位置