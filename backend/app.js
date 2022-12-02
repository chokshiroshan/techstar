/* eslint-disable quotes */
/* eslint-disable linebreak-style */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/order */
const cookieParser = require("cookie-parser");
const express = require("express");
const logger = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const { getAuthMiddleware, getAccessMiddleware } = require("u-server-utils");
const validate = require("./util/authValidator");
const url = require("./config");

//  Importing routes
const matchRoute = require("./src/routes/matchRoute");
const messageRoute = require("./src/routes/messageRoute");
const signUpRoute = require("./src/routes/signUpRoute");
const loginRoute = require("./src/routes/loginRoute");
const userRoute = require("./src/routes/userRoute");

const app = express();

// all middlewaress
app.use(logger("dev"));
app.use(cookieParser());
app.use(bodyParser.json());
const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

// app.use(cors({ origin: '*', credentials: true }));
app.use((req, res, next) => {
  // give access to all origins
  res.header("Access-Control-Allow-Origin", "*");
  // give access to all headers
  res.header("Access-Control-Allow-Headers", "*");
  // give access to all methods
  res.header("Access-Control-Allow-Methods", "*");

  next();
});

const validationMid = getAuthMiddleware(validate);

//  API Endpoints
app.use("/matches", matchRoute);
app.use("/messages", messageRoute);
app.use("/signUp", signUpRoute);
app.use("/login", loginRoute);
app.use("/users", userRoute);

module.exports = app;
