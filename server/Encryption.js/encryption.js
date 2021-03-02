const crypto = require('crypto');

exports.createCipherAes = function (password, text, type) {
  // const algorithm = "aes-192-cbc"; //algorithm to use
  // var key = crypto.scryptSync(password, 'salt', 24);
  // //console.log('key'+key.toString('base64'));
  // const iv = crypto.randomBytes(16); // generate different ciphertext everytime
  // const cipher = crypto.createCipheriv(algorithm, key, iv);
  // //for characters string type='utf8';
  // const encrypted = cipher.update(text, type, 'hex') + cipher.final('hex') + iv.toString('hex'); // encrypted text
  // //console.log(encrypted);

  // return encrypted;
  const cipher = crypto.createCipher('aes192', password);
  var encrypted = cipher.update(text, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  // console.log(encrypted);
  return encrypted;
}
exports.deCipherUsingAes = function (encrypted, password) {

  // var algorithm = "aes-192-cbc"; //algorithm to use
  // var key = crypto.scryptSync(password, 'salt', 24);
  // //console.log('key'+key.toString('base64'));
  // const decipherEncrypted = encrypted.substring(0, 32);
  // const decipherIV = encrypted.substring(32);
  // //console.log(decipherIV);
  // //console.log(decipherEncrypted);
  // const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(decipherIV, 'hex'));
  // //decipher.setAutoPadding(false);
  // //console.log('decipher'+decipher);
  // var decrypted = decipher.update(decipherEncrypted, 'hex', 'utf8') + decipher.final('utf8'); //deciphered text
  // //console.log(decrypted);
  // return decrypted;
  const decipher = crypto.createDecipher('aes192', password)
  var decrypted = decipher.update(encrypted, 'hex', 'utf8')
  decrypted += decipher.final('utf8');
  // console.log(decrypted);
  return decrypted;
}
exports.createCipherRSA = function (publicKey, data) {
  const encryptedData = crypto.publicEncrypt(
    {
      key: publicKey,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",

    },
    // We convert the data string to a buffer using `Buffer.from`
    Buffer.from(data, 'hex')
  )

  // The encrypted data is in the form of bytes, so we print it in base64 format
  // so that it's displayed in a more readable form
  // console.log("encypted data: ", encryptedData.toString("base64"))

  return encryptedData.toString('hex');
}
exports.deCipherRSA = function (privateKey, encryptedData) {
  var decryptedData;
  try {
    decryptedData = crypto.privateDecrypt(
      {
        key: privateKey,
        // In order to decrypt the data, we need to specify the
        // same hashing function and padding scheme that we used to
        // encrypt the data in the previous step
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
        oaepHash: "sha256",
      },
      Buffer.from(encryptedData, 'hex')
    )
  }
  catch (err) {
    console.log(err);
  }
  // The decrypted data is of the Buffer type, which we can convert to a
  // string to reveal the original data
  // console.log("decrypted data: ", decryptedData.toString())
  return decryptedData.toString('hex');
}
// exports.generateKey = async function (password) {

//   const person = crypto.createECDH('secp256k1');
//   person.generateKeys();
//   //return person.computeSecret(  )
//   await crypto.scrypt(password, 'salt', 32, (err, key) => {
//     console.log('key:' + key);
//     return key;
//   }); //create key

// }
exports.sha256 = async function (text) {
  // console.log(text);
  const hashed = await crypto.createHash('sha256').update(text).digest('hex');
  // console.log(hashed);
  return hashed;
}
exports.generateKey = function () {
  const key = crypto.randomBytes(16).toString('hex'); // generate different ciphertext everytime
  // console.log(key);
  return key;
}
exports.generateKeyPair = async function () {

  const { publicKey, privateKey } = await crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096, 
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
    }
  });
  //console.log(publicKey);
  //console.log(privateKey);
  return { public_key: publicKey.toString('hex'), private_key: privateKey.toString('hex') };

}