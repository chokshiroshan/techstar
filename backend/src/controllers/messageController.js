/* eslint-disable linebreak-style */
/* eslint-disable indent */
const Messages = require('../models/messageModel');

exports.createMessage = (req, res) => {
    const message = req.body;
    // match.matchTimeStamp = new Date();
    Messages.create(message, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(201).send(data);
        }
    });
};

exports.getMessagesByUserId = (req, res) => {
    const { userId } = req.params;
    Messages.find({ $or: [{ fromId: userId }, { toId: userId }] }, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            const sortedData = data.sort((a, b) => a.timeStamp - b.timeStamp);
            res.status(200).send(sortedData);
        }
    });
};

exports.getLastMessagesBySenderReceiverComboId = (req, res) => {
    const { comboId } = req.params;
    console.log("combo Id:", comboId);
    const [toId, fromId] = comboId.split('_', 2);
    console.log("to and from id:", toId, fromId);
    Messages.find({ $and: [{ fromId: fromId }, { toId: toId }] }, { _id: 0, fromId: 0, toId: 0 }, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if (data && data.length > 1) {
                const sortedData = data.sort((a, b) => b.timeStamp - a.timeStamp);
                console.log("sortedData:", sortedData);
                res.status(200).send(sortedData[0]);
            }
            else {
                console.log("single data:", data);
                res.status(200).send(data);
            }
        }
    });

}

exports.getAllMessagesBySenderReceiverComboId = (req, res) => {
    const { comboId } = req.params;
    console.log("combo Id:", comboId);
    const [toId, fromId] = comboId.split('_', 2);
    console.log("to and from id:", toId, fromId);
    Messages.find({ $or: [{ $and: [{ fromId: fromId }, { toId: toId }] }, { $and: [{ fromId: toId }, { toId: fromId }] }] }, (err, data) => {
        if (err) {
            res.status(500).send(err);
        } else {
            const sortedData = data.sort((a, b) => a.timeStamp - b.timeStamp);
            res.status(200).send(sortedData);
        }
    });

}