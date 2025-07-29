const fs = require('fs');
const path = require('path');
const grayscale = require('bindings')('grayscale-node');
console.log(grayscale.echo("Hello, Node.js!")); // 输出: "Hello, Node.js!"
console.log(grayscale.echo("测试中文"));      // 输出: "测试中文"