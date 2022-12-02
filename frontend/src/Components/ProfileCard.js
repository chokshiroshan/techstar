import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, Chip, Grid, Link, List, ListItem } from "@mui/material";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import SkillList from "./TagList";
import url from "../config/server";

export default function ProfileCard(props) {
  const navigate = useNavigate();
  const [currentUser, setcurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))[0]
  );
  const [currentProfileCard, setProfileCard] = useState("");
  const [image, setImage] = useState("");
  const [repos, setRepos] = useState([]);
  const [show, setShow] = useState(props.show);
  const handleShow = () => setShow(true);
  const [message, setMessage] = useState("");
  const [leetcode, setLeetCode] = useState("");

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("filteredUsers")).length > 0) {
      setProfileCard(JSON.parse(localStorage.getItem("filteredUsers"))[0]);
      axios
        .get(
          "https://api.github.com/users/" +
            JSON.parse(localStorage.getItem("filteredUsers"))[0]
              .githubUsername +
            "/repos"
        )
        .then((response) => {
          setRepos(response.data);
          console.log(repos);
        });
      axios
        .get("https://leetcode-stats-api.herokuapp.com/lyustefan")
        .then((response) => {
          setLeetCode(response.data);
          console.log(leetcode);
        });
    }
  }, []);

  useEffect(() => {
    axios
      .get(
        url + `/users/` + JSON.parse(localStorage.getItem("currentUser"))._id
      )
      .then((res) => {
        localStorage.setItem("currentUser", JSON.stringify(res.data));
      })
      .catch((err) => {
        console.log(err);
      });
    if (JSON.parse(localStorage.getItem("filteredUsers")).length !== 0) {
      axios
        .get(
          "https://api.github.com/users/" +
            JSON.parse(localStorage.getItem("filteredUsers"))[0]
              .githubUsername +
            "/repos"
        )
        .then((response) => {
          setRepos(response.data);
          console.log(repos);
        });
      axios
        .get("https://leetcode-stats-api.herokuapp.com/lyustefan")
        .then((response) => {
          setLeetCode(response.data);
          console.log(leetcode);
        });
    }
  }, [currentProfileCard]);

  const notInterested = (e) => {
    var newnotInterestedIds = JSON.parse(
      localStorage.getItem("currentUser")
    ).notInterestedIds;
    newnotInterestedIds.push(currentProfileCard._id);
    console.log(newnotInterestedIds);
    const userInfo = {
      _id: JSON.parse(localStorage.getItem("currentUser"))._id,
      notInterestedIds: newnotInterestedIds,
    };
    console.log(" user info is : " + JSON.stringify(userInfo));
    axios.post(url + "/users/updateUser", userInfo).then((response) => {
      console.log("Status Code : ", response.status);
      if (response.data) {
        setMessage(
          "Not Interested in collaborating with " +
            currentProfileCard.firstName +
            " " +
            currentProfileCard.lastName
        );
        handleShow();
        setTimeout(() => {
          handleClose();
          deleteItem(0);
          if (JSON.parse(localStorage.getItem("filteredUsers")).length !== 0) {
            setProfileCard(
              JSON.parse(localStorage.getItem("filteredUsers"))[0]
            );
          } else {
            setProfileCard("");
          }
        }, 700);
      }
    });
  };

  const interested = (e) => {
    var newinterestedIds = JSON.parse(
      localStorage.getItem("currentUser")
    ).interestedIds;
    newinterestedIds.push(currentProfileCard._id);
    console.log(newinterestedIds);
    const userInfo = {
      _id: JSON.parse(localStorage.getItem("currentUser"))._id,
      interestedIds: newinterestedIds,
    };
    axios.post(url + "/users/updateUser", userInfo).then((response) => {
      console.log("Status Code : ", response.status);
      if (response.data) {
        if (
          JSON.parse(
            localStorage.getItem("filteredUsers")
          )[0].interestedIds.includes(
            JSON.parse(localStorage.getItem("currentUser"))._id
          )
        ) {
          const data = {
            user1Id: JSON.parse(localStorage.getItem("currentUser"))._id,
            user2Id: JSON.parse(localStorage.getItem("filteredUsers"))[0]._id,
            matchTimeStamp: new Date().toLocaleString(),
          };
          axios.post(url + "/matches", data).then((response) => {
            console.log(response.data);
            setMessage(
              currentProfileCard.firstName +
                " " +
                currentProfileCard.lastName +
                " is interested in collaborating with you as well"
            );
            handleShow();
            setTimeout(() => {
              handleClose();
              navigate("/chats");
            }, 1000);
          });
        } else {
          setMessage(
            "Interested in collaborating with " +
              currentProfileCard.firstName +
              " " +
              currentProfileCard.lastName
          );
          handleShow();
          setTimeout(() => {
            handleClose();
            deleteItem(0);
            if (
              JSON.parse(localStorage.getItem("filteredUsers")).length !== 0
            ) {
              setProfileCard(
                JSON.parse(localStorage.getItem("filteredUsers"))[0]
              );
            } else {
              setProfileCard("");
            }
          }, 1000);
        }
      }
    });
  };

  const clearNotInterested = (e) => {
    var newnotInterestedIds = [];
    const userInfo = {
      _id: JSON.parse(localStorage.getItem("currentUser"))._id,
      notInterestedIds: newnotInterestedIds,
    };
    console.log(" user info is : " + JSON.stringify(userInfo));
    axios.post(url + "/users/updateUser", userInfo).then((response) => {
      console.log("Status Code : ", response.status);
      if (response.data) {
        navigate("/swipefilter");
      }
    });
  };

  //Closing the modal
  const handleClose = () => {
    setMessage("");
    setShow(false);
  };

  function deleteItem(index) {
    const existingEntries = JSON.parse(localStorage.getItem("filteredUsers"));
    existingEntries.splice(index, 1);
    localStorage.setItem("filteredUsers", JSON.stringify(existingEntries));
  }

  return currentUser === "" ||
    currentProfileCard === "" ||
    currentProfileCard === null ? (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={12} align="center">
          <Box sx={{ width: 700, height: 400, border: 1, align: "center" }}>
            <CardContent>
              <Typography
                sx={{ fontSize: 30, color: "#212121", mb: "0" }}
                color="text.secondary"
                align="center"
                gutterBottom
              >
                You have reached the end of users's list.
              </Typography>
              <Typography
                sx={{ fontSize: 15, color: "#616161", mb: "2" }}
                color="text.secondary"
                align="center"
                gutterBottom
              >
                Worried that you missed on potential collaborations?{" "}
              </Typography>
              <Typography
                sx={{ fontSize: 15, color: "#616161", mb: "2" }}
                color="text.secondary"
                align="center"
                gutterBottom
              >
                Don't worry, revisit profiles you marked Not Interested,{" "}
                <Link to="/swipefilter" onClick={clearNotInterested}>
                  Click Here to revisit
                </Link>
              </Typography>
            </CardContent>
          </Box>
        </Grid>
      </Grid>
    </div>
  ) : (
    <div>
      <Grid container spacing={0}>
        <Grid item xs={12} align="center">
          <Box sx={{ width: 700, border: 1 }}>
            <CardContent>
              <Grid container spacing={0}>
                <Grid item xs={12}>
                  <Grid container spacing={2} sx={{ mb: 2 }}>
                    <Grid item xs={8}>
                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <img
                            style={{
                              position: "sticky",
                              height: "130px",
                              width: "130px",
                            }}
                            src={
                              currentProfileCard.image
                                ? currentProfileCard.image
                                : "https://firebasestorage.googleapis.com/v0/b/etsy-lab1.appspot.com/o/userdefault.png?alt=media&token=d8869205-3aff-41db-b84d-cc57b92d4e50"
                            }
                            className="card-img-top"
                            alt="description of image"
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Typography
                            sx={{ fontSize: 18, color: "#212121", mb: "0" }}
                            color="text.secondary"
                            align="left"
                            gutterBottom
                          >
                            {currentProfileCard.firstName}{" "}
                            {currentProfileCard.lastName}{" "}
                          </Typography>
                          <Typography
                            sx={{ fontSize: 18, color: "#212121", mb: "0" }}
                            color="text.secondary"
                            align="left"
                            gutterBottom
                          >
                            {currentProfileCard.age}
                          </Typography>
                          <Typography
                            sx={{ fontSize: 18, color: "#212121", mb: "0" }}
                            color="text.secondary"
                            align="left"
                            gutterBottom
                          >
                            {currentProfileCard.city}
                          </Typography>
                          <Typography
                            sx={{ fontSize: 18, color: "#212121", mb: "0" }}
                            color="text.secondary"
                            align="left"
                            gutterBottom
                          >
                            {currentProfileCard.yearsOfExperience} years of
                            experience
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={3}>
                      <div>
                        <Button
                          variant="contained"
                          color="success"
                          onClick={interested}
                        >
                          Interested
                        </Button>
                        <Modal
                          show={show}
                          onHide={handleClose}
                          backdrop="static"
                          keyboard={false}
                        >
                          <Modal.Body>
                            <div class={message ? "visible" : "invisible"}>
                              <div class="alert alert-primary">{message}</div>
                            </div>
                          </Modal.Body>
                        </Modal>
                      </div>
                      &nbsp;
                      <div>
                        {" "}
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={notInterested}
                        >
                          Not Interested
                        </Button>
                        <Modal
                          show={show}
                          onHide={handleClose}
                          backdrop="static"
                          keyboard={false}
                        >
                          <Modal.Body>
                            <div class={message ? "visible" : "invisible"}>
                              <div class="alert alert-primary">{message}</div>
                            </div>
                          </Modal.Body>
                        </Modal>
                      </div>{" "}
                    </Grid>
                  </Grid>
                  <Typography
                    sx={{ fontSize: 18, color: "#212121", mb: "2" }}
                    color="text.secondary"
                    align="left"
                    gutterBottom
                  >
                    About me: {currentProfileCard.about}
                  </Typography>
                  {localStorage.getItem("swipeType") === "project" ? (
                    <Grid container spacing={0} sx={{ mb: 2 }}>
                      <Grid item xs={2.2}>
                        <Typography
                          sx={{ fontSize: 18, color: "#212121", mb: "0" }}
                          color="text.secondary"
                          align="left"
                          gutterBottom
                        >
                          Classes:
                        </Typography>
                      </Grid>
                      <Grid item xs={6} align="left">
                        {currentProfileCard.subjects.map((skill) => (
                          <SkillList skill={skill}></SkillList>
                        ))}{" "}
                      </Grid>
                    </Grid>
                  ) : (
                    <div></div>
                  )}
                  <Grid container spacing={0} sx={{ mb: 2 }}>
                    <Grid item xs={2.2}>
                      <Typography
                        sx={{ fontSize: 18, color: "#212121", mb: "0" }}
                        color="text.secondary"
                        align="left"
                        gutterBottom
                      >
                        Tech stack:
                      </Typography>
                    </Grid>
                    <Grid item xs={6} align="left">
                      {currentProfileCard.techStack.map((skill) => (
                        <SkillList skill={skill}></SkillList>
                      ))}{" "}
                    </Grid>
                  </Grid>
                  <Grid container spacing={0} sx={{ mb: 1 }}>
                    <Grid item xs={3.5}>
                      <Typography
                        sx={{ fontSize: 18, color: "#212121", mb: "0" }}
                        color="text.secondary"
                        align="left"
                        gutterBottom
                      >
                        Interested tech stack:
                      </Typography>
                    </Grid>
                    <Grid item xs={6} align="left">
                      {currentProfileCard.interestedTechStack.map((skill) => (
                        <SkillList skill={skill}></SkillList>
                      ))}{" "}
                    </Grid>
                  </Grid>
                  <Grid container spacing={0} sx={{ mb: 1 }}>
                    <Grid item xs={9}>
                      <Typography
                        sx={{ fontSize: 18, color: "#212121", mb: "0" }}
                        color="text.secondary"
                        align="left"
                        gutterBottom
                      >
                        Github contribution this past year:
                      </Typography>
                    </Grid>
                    <Grid item xs={3} align="left">
                      {repos === "" ? (
                        <div></div>
                      ) : (
                        <Typography
                          sx={{ fontSize: 18, color: "#212121", mb: "0" }}
                          color="text.secondary"
                          align="left"
                          gutterBottom
                        >
                          <Link
                            href={
                              "https://github.com/" +
                              currentProfileCard.githubUsername
                            }
                            target="_blank"
                          >
                            View Github Page
                          </Link>
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                  <img
                    sx={{ mb: "2" }}
                    src={
                      "https://ghchart.rshah.org/" +
                      currentProfileCard.githubUsername
                    }
                    alt="Github contribution chart"
                  />
                  <Grid container spacing={0} sx={{ mb: 1 }}>
                    <Grid item xs={6}>
                      <Typography
                        sx={{ fontSize: 18, color: "#212121", mb: "2" }}
                        color="text.secondary"
                        align="center"
                        gutterBottom
                      >
                        LeetCode Stats
                      </Typography>
                      <img
                        alt="LeetCode Stat Card"
                        src={
                          "https://leetcode-stats-six.vercel.app/api?username=" +
                          currentProfileCard.leetCodeUsername +
                          "&theme=dark"
                        }
                        width="300px"
                        height="130px"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <Typography
                        sx={{ fontSize: 18, color: "#212121", mb: "2" }}
                        color="text.secondary"
                        align="center"
                        gutterBottom
                      >
                        Github Stats
                      </Typography>
                      <img
                        src={
                          "https://github-readme-stats.vercel.app/api?username=" +
                          currentProfileCard.githubUsername +
                          "&theme=onedark"
                        }
                        alt="Kunalan's GitHub overview"
                        width="300px"
                        height="130px"
                      ></img>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </CardContent>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}
