const path = require('path');
const fs = require('fs');

// 定义需要复制的 DLL 文件列表
const requiredDlls = [
  'Termb.dll',
  'sdtapi.dll',
  'WltRS.dll'
];

// 源目录（DLL 所在的目录）
const sourceDir = path.join(__dirname, '..', 'native','cardreader');
// 目标目录（Node.js 进程运行的当前工作目录）
const targetDir = process.cwd();

// 检查并复制 DLL 文件
requiredDlls.forEach(dll => {
  const sourcePath = path.join(sourceDir, dll);
  const targetPath = path.join(targetDir, dll);

  // 如果源文件存在，但目标文件不存在，则复制
  if (fs.existsSync(sourcePath) && !fs.existsSync(targetPath)) {
    try {
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`[DLL Copied] ${dll} → ${targetDir}`);
    } catch (err) {
      console.error(`[Error] Failed to copy ${dll}:`, err.message);
    }
  } else if (!fs.existsSync(sourcePath)) {
    console.error(`[Error] DLL not found: ${sourcePath}`);
  }
});

// 加载 .node 模块（必须在复制 DLL 后执行）
const cardReader = require(path.join(sourceDir, 'cardreader.node'));

// 读卡
exports.read = (req, res) => {
  try {
    const cardInfo = cardReader.readIDCard();
    res.send({ status: 0, result: cardInfo });
  } catch (err) {
    res.send({ status: -1, error: err.message });
  }
};