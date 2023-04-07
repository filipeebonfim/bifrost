const { minKeyLength } = require('./config/setup');

module.exports = (password) => {
  const byteArray = new TextEncoder().encode(password);

  if (byteArray.length >= minKeyLength) { 
    return str;
  }

  const paddedByteArray = new Uint8Array(minKeyLength);
  paddedByteArray.fill(1);
  paddedByteArray.set(byteArray);

  const paddedKey = new TextDecoder().decode(paddedByteArray);
  return paddedKey;
}