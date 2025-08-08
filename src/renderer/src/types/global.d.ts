// src/global.d.ts

// 确保这个文件是一个模块，以避免全局作用域污染
export { };

// 扩展全局的 Window 接口
declare global {
    interface Window {
        electronAPI: {
            system: {
                getInfo: () => Promise<string>;
            }
        };
    }
}
