import { Button, Card, CardContent, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import userJson from "./user.json";
import url from "../config/server";

function SwipeFilters(props) {
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(
        url + `/users/` + JSON.parse(localStorage.getItem("currentUser"))._id
      )
      .then((res) => {
        localStorage.setItem("currentUser", JSON.stringify(res.data));
        console.log(JSON.parse(localStorage.getItem("currentUser")).emailId);
        axios
          .get(url + `/users`)
          .then((res) => {
            localStorage.setItem("users", JSON.stringify(res.data));
            var filteredUsers = JSON.parse(localStorage.getItem("users"))
              .filter(
                (user) =>
                  user.emailId !==
                  JSON.parse(localStorage.getItem("currentUser")).emailId
              )
              .filter(
                (user) =>
                  !JSON.parse(
                    localStorage.getItem("currentUser")
                  ).interestedIds.includes(user._id)
              )
              .filter(
                (user) =>
                  !JSON.parse(
                    localStorage.getItem("currentUser")
                  ).notInterestedIds.includes(user._id)
              );
            console.log(filteredUsers);
            localStorage.setItem(
              "filteredUsers",
              JSON.stringify(filteredUsers)
            );
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const normalSwipe = (e) => {
    localStorage.setItem("swipeType", "normal");
    navigate("/swipe", { users: localStorage.getItem("filteredUsers") });
  };

  const projectSwipe = (e) => {
    localStorage.setItem("swipeType", "project");
    localStorage.setItem(
      "filteredUsers",
      JSON.stringify(
        JSON.parse(localStorage.getItem("filteredUsers")).filter(
          (user) => user.subjects.length > 0
        )
      )
    );
    navigate("/swipe", { users: localStorage.getItem("filteredUsers") });
  };

  const card = (e) => (
    <React.Fragment>
      <CardContent>
        {e === "project" ? (
          <div>
            <img
              style={{
                position: "center",
                height: "300px",
                width: "320px",
              }}
              src={
                image
                  ? image
                  : "https://firebasestorage.googleapis.com/v0/b/etsy-lab1.appspot.com/o/Group-Projects.webp?alt=media&token=d8975973-b05f-4ab3-be2b-a2409dac8ad0"
              }
              className="card-img-top"
              alt="description of image"
            />
            &nbsp;
            <div align="center">
              {" "}
              <Button variant="outlined" color="success" onClick={projectSwipe}>
                Collaborate on your next SJSU project
              </Button>
            </div>
          </div>
        ) : (
          <div>
            <img
              style={{
                position: "center",
                height: "300px",
                width: "320px",
              }}
              src={
                image
                  ? image
                  : "https://firebasestorage.googleapis.com/v0/b/etsy-lab1.appspot.com/o/Interests.jpg?alt=media&token=f0d32a5b-53b9-415f-a856-553622008bdd"
              }
              className="card-img-top"
              alt="description of image"
            />
            &nbsp;
            <div align="center">
              {" "}
              <Button variant="outlined" color="success" onClick={normalSwipe}>
                Collaborate with people around the world
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </React.Fragment>
  );

  return (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={12} align="center">
          <Typography
            sx={{ fontSize: 30, color: "#212121", mb: "0" }}
            color="text.secondary"
            align="center"
            gutterBottom
          >
            Welcome {JSON.parse(localStorage.getItem("currentUser")).firstName}
          </Typography>
        </Grid>
      </Grid>
      {JSON.parse(localStorage.getItem("currentUser")).subjects.length > 0 ? (
        <Grid container spacing={2}>
          <Grid item xs={6} align="right">
            <Box sx={{ width: 350, height: 350 }}>
              <Card variant="outlined">{card("project")}</Card>
            </Box>
          </Grid>
          <Grid item xs={6} align="left">
            <Box sx={{ width: 350, height: 350 }}>
              <Card variant="outlined">{card("normal")}</Card>
            </Box>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={2}>
          <Grid item xs={12} align="center">
            <Box sx={{ width: 350, height: 350 }}>
              <Card variant="outlined">{card("normal")}</Card>
            </Box>
          </Grid>
        </Grid>
      )}
    </div>
  );
}

export default SwipeFilters;
