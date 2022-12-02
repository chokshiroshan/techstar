/* eslint-disable quotes */
/* eslint-disable linebreak-style */
/* eslint-disable indent */

const mongoose = require("mongoose");

const matchSchema = mongoose.Schema(
  {
    user1Id: {
      type: String,
      required: true,
    },
    user2Id: {
      type: String,
      required: true,
    },
    matchTimeStamp: {
      type: Date,
      required: true,
    },
  },
  {
    versionKey: false,
  }
);

module.exports = mongoose.model("matches", matchSchema);
