/* eslint-disable linebreak-style */
/* eslint-disable indent */

const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    fromId: {
        type: String,
        required: true,
    },
    toId: {
        type: String,
        required: true,
    },
    message: {
        type: String,
    },
    timeStamp: {
        type: Date,
    },
}, {
    versionKey: false,
});

module.exports = mongoose.model('message', messageSchema);
