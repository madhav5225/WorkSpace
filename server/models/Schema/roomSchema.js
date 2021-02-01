const mongoose = require("mongoose");
const messageSchema = require("./messageSchema");

const roomSchema = new mongoose.Schema({
    room_id: { type: String, unique: true },
    topic: String,
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    messages: [messageSchema],
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
},
{
    autoCreate: true
});

module.exports = roomSchema;