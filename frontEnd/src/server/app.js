const express = require('express');
const cors = require('cors');
const joi = require('joi');

const app = express();

// 获取本机局域网 IP
function getLocalIP() {
    const interfaces = require('os').networkInterfaces();
    for (const devName in interfaces) {
        const iface = interfaces[devName];
        for (const alias of iface) {
            if (alias.family === 'IPv4' && !alias.internal) {
                return alias.address;
            }
        }
    }
    return '0.0.0.0';
}

// 常规中间件
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// 自定义响应方法
app.use((req, res, next) => {
    res.cc = function (err, status = 1) {
        res.send({
            status,
            message: err instanceof Error ? err.message : err,
        });
    };
    next();
});

// 路由
const testRouter = require('./router/test');
app.use('/test', testRouter);

const cardReaderRouter = require('./router/cardReader');
app.use('/cardReader', cardReaderRouter);

// 错误处理中间件
app.use((err, req, res, next) => {
    if (err instanceof joi.ValidationError) return res.cc(err);
    res.cc(err);
});

const port = '8888';
app.listen(port, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${port}`);
    console.log(`局域网访问地址：http://${getLocalIP()}:${port}`);
});