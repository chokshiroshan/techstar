const jwt = require("jsonwebtoken");
const constants = require("../../constants.json");
const Users = require("../models/UserModel");
const { auth } = require("../../passport");

const { secret } = global.gConfig;

auth();

const login = (req, res) => {
  console.log("Inside Login Post Request");
  console.log("Req Body : ", req.body);

  Users.findOne({
    emailId: req.body.emailId,
   password: req.body.password,
}, (error, mongoUser) => {
    console.log(`users find ${mongoUser}`);
    console.log(`Error is ${error}`);
    if (error) {
        console.log(`Error is ${error}`);
      }
      if (mongoUser) {
        console.log(`User from mongo is  ${JSON.stringify(mongoUser)}`);

        // eslint-disable-next-line no-underscore-dangle
        const payload = {
          _id: mongoUser._id,
          username: mongoUser.email_id,
          currentUser: mongoUser,
        };
        const token = jwt.sign(payload, secret, {
          expiresIn: 1008000,
      });
      // res.end(JSON.stringify(mongoUser));
       res.status(200).end(`JWT ${token}`);
    } else {
      res.writeHead(200, {
          'Content-Type': 'text/plain',
      });
      res.end(constants.INVALID_CREDENTIALS);
      console.log('Invalid credentials');
    }
});
};
module.exports = login;
