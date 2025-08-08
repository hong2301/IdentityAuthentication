const idReader = require('../build/Debug/cardreader.node');
const cardInfo = idReader.readIDCard();
console.log(cardInfo);
