const path = require('path');
const caedReader = require(path.join(__dirname, '..', 'addon', 'caedReader', 'build', 'Release', 'caedReader.node'));

// 读卡
exports.read = (req, res) => {
    // const reqBody = req.body
    // res.send({ status: 0, result: reqBody.value })
};