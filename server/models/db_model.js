const mongoose = require('mongoose');


exports.userModel = mongoose.model('User', user);
exports.roomModel = mongoose.model('Room', room);
exports.messageModel = mongoose.model('Message', message);