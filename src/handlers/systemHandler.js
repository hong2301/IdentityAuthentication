const os = require('os');

module.exports = (ipcMain) => {
    ipcMain.handle('system:get-info', () => {
        return {
            hostname: os.hostname(),
            platform: os.platform(),
            arch: os.arch(),
            totalMemory: os.totalmem(),
            freeMemory: os.freemem(),
        };
    });
};
