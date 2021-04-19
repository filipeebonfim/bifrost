const tar = require('tar');
const {
  createReadStream,
  createWriteStream,
} = require('fs');

const crypto = require('crypto');

const algorithm = 'aes-256-cbc';

const defaultIV = Buffer.from('0000000000000000');

module.exports = (data) => {
  let tar_name = data.fileName ? data.fileName : 'tar_file';
  tar_name += '.tgz'

  console.log('Packing ' + data.filePath);
  
  if (!data.iv)
    console.log('Using default IV to encrypt');

  console.log('Starting Encrypt.js');
    
  const IV = data.iv ? Buffer.from(data.iv.toString()) : defaultIV;
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(data.password), IV);

  tar.c({
    file: tar_name,
    C: data.filePath
  }, ['./']).then(() => {
    const read = createReadStream(tar_name);
    const enc_writer = createWriteStream(tar_name + '.enc');

    read.pipe(cipher).pipe(enc_writer);
    console.log('Done - ' + tar_name + '.enc created!');
  }).catch((e) => console.log(e));
}
