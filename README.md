# Bifrost

This script is responsible for encrypt files and packages

### Dependency

- Node
- Npm

### Arguments

____

- `-p password`: The password to encrypt or decrypt some tar file
- `--iv 1234567891113150` The initial vector. The size needs to be **16 bytes** used to encrypt & decrypt
    - If the vector sent is less than 16 bytes then the script use a default vector
- `--path ./encryptThisFile.txt` The path where your folder or file is.
- `-d ./output` _optional_. Path where your output will be written
- `--tarName encrypted` _optional_. Name your encrypted output file

### Methods Available

____

```
[
    'encrypt',
    'decrypt'
]
```

### Running

#### Encrypt
        node app.js encrypt --path ./thefolder --tarName encrypted -p 'password' --iv 1234567891113150
        npm run encrypt -- --path ./thefolder --tarName encrypted -p 'password' --iv 1234567891113150

#### Decrypt

        node app.js decrypt --path ./encrypted.tgz.enc -p 'password' --iv iv 1234567891113150
        npm run decrypt -- --path ./encrypted.tgz.enc -p 'password' --iv iv 1234567891113150


