const { generateKey, createCipher, createCipherRSA, deCipherUsingAes, deCipherRSA } = require('../Encryption.js/encryption');
const { roomModel } = require('../models/db_model');
const { getEncryptedPrivateKey, getPublicKey, getSymmetricKey } = require('./getKey');

const roomController = async (req, res) => {

    var room_id = req.query.room_id;
    var user1 = req.query.user1;
    var user2 = req.query.user2;
    var room = roomModel;

    await room.findOne({ room_id }).exec(async (err, result) => {
        if (!result) {
            var newRoom;
            try {
                const symmetricKey = await generateKey();
                console.log('symmetricKey: ' + symmetricKey);


                console.log('public_keyUSer1: ' + req.session.user.public_key);

                const EncryptedsymmetricKeyUser1 = createCipherRSA(req.session.user.public_key, symmetricKey);
                console.log('EncryptedsymmetricKeyUser1: ' + EncryptedsymmetricKeyUser1);

                const public_keyUSer2 = await getPublicKey(user2);
                console.log('public_keyUSer2: ' + public_keyUSer2);

                const EncryptedsymmetricKeyUser2 = createCipherRSA(public_keyUSer2, symmetricKey);
                console.log('EncryptedsymmetricKeyUser2: ' + EncryptedsymmetricKeyUser2);

                newRoom = new room({
                    room_id, topic: 'privateChat',
                    encryptedsymmetricKeyData: [
                        { user: user1, encryptedsymmetricKey: EncryptedsymmetricKeyUser1 },
                        { user: user2, encryptedsymmetricKey: EncryptedsymmetricKeyUser2 }
                    ]
                    , users: [user1, user2], messages: []
                });

                newRoom.save();

            }
            catch (err) {
                console.log(err);
                return res.send({ room: undefined, msg: 'error while creating room' });

            }
            return res.send({ room: newRoom, msg: 'success' });
        }
        else if (err) {
            return res.send({ room: undefined, msg: 'error while creating room' });
        }
        // console.log(await getEncryptedPrivateKey(user2));

        const encryptedsymmetricKeyData = await getSymmetricKey(result.room_id);
        try {
            if (encryptedsymmetricKeyData[0].user == user1) {
                const EncryptedsymmetricKey = encryptedsymmetricKeyData[0].encryptedsymmetricKey;
                const EncryptedPrivateKey = req.session.user.encrypted_private_key;
                //console.log(req.session.passPhrase);
                console.log(req.session);
                const PrivateKey = deCipherUsingAes(EncryptedPrivateKey, req.session.passPhrase);
                //console.log('PrivateKey: ' + PrivateKey);
                const SymmetricKey = await deCipherRSA(PrivateKey, EncryptedsymmetricKey);
                console.log('SymmetricKey: ' + SymmetricKey);
                req.session['' + room_id] = SymmetricKey;
            }
            else {
                const EncryptedsymmetricKey = encryptedsymmetricKeyData[1].encryptedsymmetricKey;
                const EncryptedPrivateKey = req.session.user.encrypted_private_key;
                //console.log(req.session.passPhrase);
                console.log(req.session);
                const PrivateKey = deCipherUsingAes(EncryptedPrivateKey, req.session.passPhrase);
                //console.log('PrivateKey: ' + PrivateKey);
                const SymmetricKey = await deCipherRSA(PrivateKey, EncryptedsymmetricKey);
                console.log('SymmetricKey: ' + SymmetricKey);
                req.session['' + room_id] = SymmetricKey;
            }
           return  res.send({ room: result, msg: 'success' });
        }
        catch (err) {
            console.log(err);
            res.send({ room: result, msg: 'Fail' });
        }

      
    });

}

module.exports = roomController;