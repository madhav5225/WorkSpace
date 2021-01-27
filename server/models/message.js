const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema(
    {
        msg: {
            type: String,
            trim: true,
            required: true,
            unique: true,
            lowercase: true
        },
        msgType: {
            type: String,
            default: "txt"
        },
        sender: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
        receiver: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
        sendAt: { type: Date , index:true ,require:true },
        receivedAt: { type: Date },

    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('messages', messageSchema);