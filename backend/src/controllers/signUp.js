const constants = require('../../constants.json');
const Users = require('../models/UserModel');

const signUp = (req, res) => {
  console.log('Inside Sign Up Post Request');

  const inputUser = new Users({
    userId: req.body.userId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    emailId: req.body.emailId,
    password: req.body.password,
    phoneNo: req.body.phoneNo,
    dateOfBirth: req.body.dateOfBirth,
    age: req.body.age,
    qualification: req.body.qualification,
    governmentId: req.body.governmentId,
    githubUsername: req.body.githubUsername,
    leetCodeUsername: req.body.leetCodeUsername,
    yearsOfExperience: req.body.yearsOfExperience,
    subjects: req.body.subjects,
    techStack: req.body.techStack,
    interestedTechStack: req.body.interestedTechStack,
    image: req.body.image,
    city: req.body.city,
    country: req.body.country,
  });
  console.log('Inside Sign Up Post Request');
  console.log('inputUser : ', inputUser);

  Users.findOne({emailId: req.body.emailId}, (error, mongoUser) => {
    console.log(`users find ${mongoUser}`);
    console.log(`Error is ${error}`);
    if (error) {
      res.writeHead(500, {
        'Content-Type': 'text/plain',
      });
      res.end();
    }
    if (mongoUser) {
      res.writeHead(200, {
        'Content-Type': 'text/plain',
      });
      res.end(constants.USER_ALREADY_EXISTS);
    } else {
      // eslint-disable-next-line no-shadow
      inputUser.save((error, data) => {
        if (error) {
          res.writeHead(500, {
            'Content-Type': 'text/plain',
          });
          res.end();
        } else {
          res.writeHead(200, {
            'Content-Type': 'text/plain',
          });
          res.end(constants.USER_CREATED);
        }
      });
    }
  });
};
module.exports = signUp;
