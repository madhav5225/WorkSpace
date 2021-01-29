const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema(
    {
        msgId: {
            type: Number,
            required: true
        },
        msg: {
            type: String,
            trim: true,
            required: true
        },
        msgType: {
            type: String,
            default: "txt"
        },
        isSeen: {
            type: Number,
            required: true
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