/* eslint-disable quotes */
/* eslint-disable */
const constants = require("../../constants.json");
const Users = require("../models/UserModel");

exports.getAllUsers = (req, res) => {
  Users.find({}, (error, mongoUser) => {
    if (error) {
      console.log(`Error is ${error}`);
    }
    if (mongoUser) {
      console.log(mongoUser);
      res.status(200).end(JSON.stringify(mongoUser));
    } else {
      res.writeHead(200, {
        "Content-Type": "text/plain",
      });
      res.end("Unable to fetch users");
    }
  });
};

exports.getUserByUserId = (req, res) => {
  console.log("inside getUserByUserId");
  Users.findById(req.params.userId, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
};

exports.updateUser = (req, res) => {
  console.log("inside post updateUser");

  const inputUser = {
    // userId: req.body.userId,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    emailId: req.body.emailId,
    // password: req.body.password,
    notInterestedIds: req.body.notInterestedIds,
    interestedIds: req.body.interestedIds,
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
    about: req.body.about,
  };
  console.log("req fasdfasfsdafas: " + inputUser);
  console.log("req id: " + req.body._id);

  Users.findOneAndUpdate(
    { _id: req.body._id },
    inputUser,
    { new: true },
    (err, updatedUser) => {
      console.log("inside find and update");
      console.log("updatedUser " + updatedUser);
      console.log("err " + err);
      if (err) {
        console.log("Error occoured while updating user is " + err);
        return;
      }
      if (updatedUser) {
        console.log("updated use is " + updatedUser);
        res.writeHead(200, {
          "Content-Type": "application/json",
        });
        res.end(JSON.stringify(updatedUser));
      }
    }
  );
};
