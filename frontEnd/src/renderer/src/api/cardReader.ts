// src/api/test.ts

// 引入 axios 实例
import service from './request'; // 假设您已经创建了 axios 实例并导出为 service

/**
 * read
 * @returns {Promise} - 返回 Promise 对象
 */
export function read(): Promise<any> {
    // 2. 改进了 data 的类型，更精确
    return service.post('/cardReader/read');
}
