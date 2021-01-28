const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema(
    {
        msg: {
            type: String,
            trim: true,
            required: true
        },
        msgType: {
            type: String,
            default: "txt"
        },
        sender: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
        receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
        sendAt: { type: Date ,default:Date.now, index:true ,require:true },
        receivedAt: { type: Date }
    },
    {
        autoCreate:true,
    }
);

module.exports = messageSchema;