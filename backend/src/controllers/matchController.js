/* eslint-disable quotes */
/* eslint-disable linebreak-style */
/* eslint-disable indent */
const Matches = require("../models/matchModel");
const Users = require("../models/UserModel");

exports.createMatch = (req, res) => {
  const match = req.body;
  console.log(match);
  // match.matchTimeStamp = new Date();
  Matches.create(match, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
};

exports.getMatchesByUserId = (req, res) => {
  const { userId } = req.params;
  console.log("userId:", userId);
  Matches.find(
    { $or: [{ user1Id: userId }, { user2Id: userId }] },
    (err, data) => {
      if (err) {
        res.status(500).send(err);
      } else {
        console.log("result:", data)
        res.status(200).send(data);
      }
    }
  );
};
