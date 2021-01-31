const { Schema } = require("mongoose");
const messageSchema = require("./messageSchema");


const roomSchema = new Schema({
    name: { type: String, lowercase: true, unique: true },
    topic: String,
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
    messages: [messageSchema],
    created_at: Date,
    updated_at: { type: Date, default: Date.now },
});

module.exports = roomSchema;