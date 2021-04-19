const tar = require('tar');
const {
  createReadStream,
  existsSync,
  mkdirSync,
} = require('fs');

const crypto = require('crypto');

const algorithm = 'aes-256-cbc';

const defaultIV = Buffer.from('0000000000000000');
const defaultDir = './extract';


module.exports = (data) => {
  if (!data.iv)
    console.log('Using default IV to descrypt');

  const dir = data.destiny ? data.destiny : defaultDir;

  if (!existsSync(dir))
    mkdirSync(dir);

  console.log('Starting Decrypt.js');
  const IV = data.iv ? Buffer.from(data.iv.toString()) : defaultIV;
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(data.password), IV);
  let extractor = tar.x({
    trim: 1,
    C: dir // the dir you want to extract
  })
  createReadStream(data.filePath).pipe(decipher).pipe(extractor);
}
