import { Container, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { Button, Modal } from "react-bootstrap";
const jwt_decode = require("jwt-decode");
const url = require("../../config/server").default;

function Login(props) {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [authFlag, setAuthFlag] = useState(false);
  const [token, setToken] = useState("");
  const [message, setMessage] = useState("");
  const [redirectVar, setRedirectVar] = useState(null);
  const navigate = useNavigate();

  const emailIdChangeHandler = (e) => {
    setEmailId(e.target.value);
  };

  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  const submitLogin = (e) => {
    console.log("Inside submit login");
    console.log(url);
    e.preventDefault();
    const data = {
      emailId: emailId,
      password: password,
    };
    //set the with credentials to true
    // axios.defaults.withCredentials = true;
    //make a post request with the user data
    //handle cors error
    axios.defaults.headers.common["Access-Control-Allow-Origin"] = "http://localhost:3000";

    axios.post(`${url}/login`, data).then((response) => {
      if (response.status === 200 && response.data === "Invalid Credentials") {
        alert("Please enter valid username and password!");
        setMessage("Login failed. Please retry with valid credentials");
        setAuthFlag(false);
        // window.open('/login','_self');
      } else {
        console.log("Status Code : ", response.status);
        // console.log("data : ", response.data);
        setAuthFlag(true);
        setToken(response.data);
        localStorage.setItem("token", response.data);

        var decoded = jwt_decode(response.data.split(" ")[1]);
        localStorage.setItem("user_id", decoded._id);
        localStorage.setItem("username", emailId);
        // console.log("current user is : " + JSON.stringify(decoded.currentUser))
        localStorage.setItem(
          "currentUser",
          JSON.stringify(decoded.currentUser)
        );
        //setRedirectVar(<Navigate to= "/home"/>)
        // alert("Item added succussesfully.");
        props.closeModal(false);
        navigate("/swipefilter");
      }
    });
  };

  return (
    <Container>
      {redirectVar}
      <Modal
        show={true}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          closeButton
          onClick={() => {
            props.closeModal(false);
          }}
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Welcome to FindYourTechStar
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container">
            <center>
              <div className="login-form">
                <div className="main-div">
                  <Typography
                    sx={{ fontSize: 18, color: "#616161", mb: "2" }}
                    color="text.secondary"
                    align="left"
                    gutterBottom
                  >
                    Please Login
                  </Typography>
                  <Grid container spacing={2} align="left">
                    <Grid item xs={12} sm={12}>
                      <TextField
                        autoComplete="emailId"
                        name="emailId"
                        fullWidth
                        id="emailId"
                        label="Email Address"
                        onChange={emailIdChangeHandler}
                        autoFocus
                      />
                    </Grid>

                    <br />
                    <br />
                    <Grid item xs={12} sm={12}>
                      <TextField
                        autoComplete="password"
                        name="password"
                        type="password"
                        fullWidth
                        id="password"
                        label="Password"
                        onChange={passwordChangeHandler}
                        autoFocus
                      />
                    </Grid>
                  </Grid>
                  {/* <div className="formStyle">
                                <input onChange = {emailIdChangeHandler} type="email" className="form-control" name="emailId" placeholder="Email Id"/>
                            </div> */}
                  {/* <div className="formStyle">
                    <input
                      onChange={passwordChangeHandler}
                      type="password"
                      className="form-control"
                      name="password"
                      placeholder="Password"
                    />
                  </div> */}
                  <br></br>
                  <Grid container spacing={2} align="left">
                    <Grid item xs={7}>
                      <button onClick={submitLogin} className="btn btn-primary">
                        Login
                      </button>{" "}
                    </Grid>

                    <br />
                    <br />
                    <Grid item xs={5}>
                      <Typography
                        sx={{ fontSize: 18, color: "#616161", mb: "2" }}
                        color="text.secondary"
                        align="left"
                        gutterBottom
                      >
                        New here,{" "}
                        <Link
                          to="/signUp"
                          onClick={() => {
                            props.closeModal(false);
                          }}
                        >
                          Sign Up
                        </Link>
                      </Typography>
                    </Grid>
                  </Grid>
                  <br></br>
                  <br></br>
                  <div className="formStyle">{message}</div>
                </div>
              </div>
            </center>
          </div>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Login;
