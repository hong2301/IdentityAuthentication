const path = require('path');
const caedReader = require(path.join(__dirname, '..', 'addon', 'cardReader', 'build', 'Debug', 'cardreader.node'));

// 读卡
exports.read = (req, res) => {
    const cardInfo = caedReader.readIDCard();
    res.send({ status: 0, result: cardInfo })
};