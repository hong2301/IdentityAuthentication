// src/api/test.ts

// 引入 axios 实例
import service from './request'; // 假设您已经创建了 axios 实例并导出为 service

/**
 * 封装测试的 /echo 接口
 * @param {Object} data - 请求的数据对象
 * @param {string} data.value - 要传递的字符串值
 * @returns {Promise} - 返回 Promise 对象
 */
export function echo(data: { value: string }): Promise<any> {
    // 2. 改进了 data 的类型，更精确
    return service.post('/test/echo', data);
}
