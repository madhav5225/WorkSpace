const crypto = require('crypto');
exports.createCipher = function (password, text,type) {
  const algorithm = "aes-192-cbc"; //algorithm to use
  var key = crypto.scryptSync(password, 'salt', 24);
  const iv = crypto.randomBytes(16); // generate different ciphertext everytime
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  //for characters string type='utf8';
  const encrypted = cipher.update(text, type, 'hex') + cipher.final('hex') + iv.toString('hex'); // encrypted text
  console.log(encrypted);

  return encrypted;
}
exports.deCipher = function (encrypted, key) {

  var algorithm = "aes-192-cbc"; //algorithm to use
  const decipherEncrypted = encrypted.substring(0, 32);
  const decipherIV = encrypted.substring(32);
  console.log(decipherIV);
  console.log(decipherEncrypted);
  const decipher = crypto.createDecipheriv(algorithm, key, Buffer.from(decipherIV, 'hex'));
  var decrypted = decipher.update(decipherEncrypted, 'hex', 'utf8') + decipher.final('utf8'); //deciphered text
  console.log(decrypted);
  return decrypted;
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
console.log(text);
const hashed=await crypto.createHash('sha256').update(text).digest('hex');
console.log(hashed);
  return hashed;
}
exports.generateKey = function () {
  const key = crypto.randomBytes(16).toString('hex'); // generate different ciphertext everytime
  console.log(key);
  return key;
}
exports.generateKeyPair = async function (passPhrase) {
  
  const { publicKey, privateKey }=await crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem'
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
      cipher: 'aes-256-cbc',
      passphrase: passPhrase
    }
  });
  //console.log(publicKey);
  //console.log(privateKey);
  return {public_key:publicKey,encrypted_private_key:privateKey};
  
}