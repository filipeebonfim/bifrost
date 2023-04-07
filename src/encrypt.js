const tar = require('tar');
const {
  createReadStream,
  createWriteStream,
} = require('fs');

const crypto = require('crypto');

const {
  algorithm,
  defaultIV,
} = require('./config/setup')

const fillPasswordSize = require('./fillPasswordSize');

module.exports = (data) => {
  const tar_name = `${data.targetfileName ? data.targetfileName : 'tar_file'}.tgz`;
  const password = fillPasswordSize(data.password);
  console.log('Packing ' + data.sourcePath);
  
  if (!data.iv) console.log('Using default IV to encrypt');

  console.log('Starting Encrypt.js');
    
  const IV = data.iv ? Buffer.from(data.iv.toString()) : defaultIV;
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(password), IV);

  const sourceSplited = data.sourcePath.split('/');
  const fileOrDirSourceName = sourceSplited.pop();
  data.sourcePath = sourceSplited.join('/')

  tar.c({
    file: tar_name,
    cwd: data.sourcePath
  }, [fileOrDirSourceName]).then(() => {
    const read = createReadStream(tar_name);
    const enc_writer = createWriteStream(tar_name + '.enc');

    read.pipe(cipher).pipe(enc_writer);
    console.log('Done - ' + tar_name + '.enc created!');
  }).catch((e) => console.log(e));
}
