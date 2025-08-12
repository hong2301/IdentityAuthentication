const fs = require('fs').promises; // 使用 Promise 版本的 fs API
const path = require('path');

// 我们导出一个函数，这个函数接收 ipcMain 对象作为参数
module.exports = (ipcMain) => {
    // 为 'file:read' 通道注册一个处理器
    ipcMain.handle('file:read', async (event, filePath) => {
        try {
            const content = await fs.readFile(filePath, 'utf-8');
            return { success: true, data: content };
        } catch (error) {
            console.error('Failed to read file:', error);
            return { success: false, error: error.message };
        }
    });

    // 你可以继续添加更多文件相关的 API
    ipcMain.handle('file:write', async (event, filePath, content) => {
        try {
            await fs.writeFile(filePath, content, 'utf-8');
            return { success: true };
        } catch (error) {
            console.error('Failed to write file:', error);
            return { success: false, error: error.message };
        }
    });
};
