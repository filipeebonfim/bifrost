module.exports = {
  minKeyLength: 32,
  algorithm: 'aes-256-cbc',
  defaultIV: Buffer.from('0000000000000000'),
  defaultDir: './extract',
}