const path = require('path');
const fs = require('fs');
const cardReader = require('../native/cardreader/cardreader.node');

// 读卡
exports.read = (req, res) => {
  try {
    const cardInfo = cardReader.readIDCard();
    res.send({ status: 0, result: cardInfo });
  } catch (err) {
    res.send({ status: -1, error: err.message });
  }
};