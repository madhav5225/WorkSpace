
const { userModel, roomModel } = require("../models/db_model");

exports.getEncryptedPrivateKey = async (user_id) => {
    var Encrypted_private_key;
    try {
        // console.log(user_id);
        Encrypted_private_key = (await userModel.findOne({ _id: user_id })).encrypted_private_key;
        // console.log(Encrypted_private_key);
        return Encrypted_private_key;
    }
    catch (error) {

    }
    // console.log('Encrypted_private_key: ' + Encrypted_private_key);
}
exports.getPublicKey = async (user_id) => {
    var public_key;
    try {
        // console.log(user_id);
        public_key = (await userModel.findOne({ _id: user_id })).public_key;
        // console.log(public_key);
        return public_key;
    }
    catch (error) {

    }
    // console.log('publi Key: ' + public_key);
    //return public_key;
}
exports.getSymmetricKey = async (room_id) => {
    var encryptedsymmetricKeyData;
    try {
        // console.log(room_id);
        encryptedsymmetricKeyData = (await roomModel.findOne({ room_id: room_id })).encryptedsymmetricKeyData;
        // console.log(encryptedsymmetricKeyData);
        return encryptedsymmetricKeyData;
    }
    catch (error) {

    }
    // console.log('encryptedsymmetricKeyData:  ' + encryptedsymmetricKeyData);
    //return public_key;
}