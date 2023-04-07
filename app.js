const encrypt = require('./src/encrypt');
const decrypt = require('./src/decrypt');

const functions = Object.freeze({
  encrypt: "encrypt",
  decrypt: "decrypt",

});

const customObject = {
  [functions.encrypt]: encrypt,
  [functions.decrypt]: decrypt

};

const main = () => {
  const args = require('minimist')(process.argv.slice(2));
  const method = args._[0];

  const data = {
    sourcePath: args.path,
    targetfileName: args.tarName ? args.tarName : null,
    password: args.p,
    iv: args.iv,
    outputPath: args.d,
  }

  const fun = customObject[method];

  if (!fun) {
    console.log('Method "' + method + '" not found, try again...');
    return;
  }

  console.log('Calling ' + method + '...');

  if (!data.password) {
    console.log('Missing password arg to ' + method);
    return;
  }

  fun(data);
}

main();


