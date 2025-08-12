// src/preload/preload.js
const { contextBridge, ipcRenderer } = require('electron');

// 使用 contextBridge 暴露 API 到 window 对象
contextBridge.exposeInMainWorld('electronAPI', {
    // --- 文件操作 API ---
    files: {
        readFile: (filePath) => ipcRenderer.invoke('file:read', filePath),
        writeFile: (filePath, content) => ipcRenderer.invoke('file:write', filePath, content),
    },

    // --- 系统信息 API ---
    system: {
        getInfo: () => ipcRenderer.invoke('system:get-info'),
    },

    // 你可以继续添加其他模块的 API
    // db: { ... }
});