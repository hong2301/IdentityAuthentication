const express = require('express')
const router = express.Router()

// 导入测试路由处理函数模块
const testHandler = require('../router_handler/cardReader')


router.post('/read', testHandler.read)

module.exports = router