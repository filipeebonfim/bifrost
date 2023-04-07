const tar = require('tar');
const {
  createReadStream,
  existsSync,
  mkdirSync,
} = require('fs');

const crypto = require('crypto');

const {
  algorithm,
  defaultIV,
  defaultDir
} = require('./config/setup');

const fillPasswordSize = require('./fillPasswordSize');

module.exports = (data) => {
  if (!data.iv) console.log('Using default IV to descrypt');

  const dir = data.outputPath ? data.outputPath : defaultDir;
  const password = fillPasswordSize(data.password);

  if (!existsSync(dir)) {
    mkdirSync(dir);
  }

  console.log('Starting Decrypt.js');
  const IV = data.iv ? Buffer.from(data.iv.toString()) : defaultIV;
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(password), IV);
  let extractor = tar.x({
    trim: 1,
    C: dir // the dir where it will extract
  })
  createReadStream(data.sourcePath).pipe(decipher).pipe(extractor);
}
