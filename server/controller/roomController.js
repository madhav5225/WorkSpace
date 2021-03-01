const { generateKey, createCipher } = require('../Encryption.js/encryption');
const { roomModel } = require('../models/db_model');

const roomController = async (req, res) => {

    var room_id = req.query.room_id;
    var user1 = req.query.user1;
    var user2 = req.query.user2;
    var room = roomModel;

    await room.findOne({ room_id }).exec(async (err, result) => {
        if (!result) {
            const newRoom = new room({ room_id, topic: 'privateChat', users: [user1, user2], messages: [] });
            try{
            newRoom.save();
            }
            catch(err)
            {
                return res.send({room:undefined,msg:'error while creating room'});
            }
            try{
            const symmetricKey=await generateKey();
            console.log('symmetricKey: '+symmetricKey);
            const EncryptedsymmetricKey=
            await createCipher(symmetricKey,req.session.password,'hex');
            console.log('EncryptedsymmetricKey: '+EncryptedsymmetricKey);
            }
            catch(err)
            {
                console.log(err);
            }
            return res.send({room:newRoom,msg:'success'});
        }
        else if(err)
        {
            return res.send({room:undefined,msg:'error while creating room'});
        }
        res.send({room:result,msg:'success'});

    });

}

module.exports = roomController;