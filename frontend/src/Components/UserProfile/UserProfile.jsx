import {
  Checkbox,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import axios from "axios";
import { FiX } from "react-icons/fi";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage_bucket } from "../../firebase/firebaseConfig";
import { useNavigate } from "react-router-dom";
const url = require("../../config/server").default;


function UserProfile() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );
  const [firstName, setfirstName] = useState(user.firstName);
  const [lastName, setlastName] = useState(user.lastName);
  const [emailId, setemailId] = useState(user.emailId);
  const [password, setpassword] = useState("");
  const [age, setage] = useState(user.age);
  const [githubUsername, setgithubUsername] = useState(user.githubUsername);
  const [leetCodeUsername, setleetCodeUsername] = useState(
    user.leetCodeUsername
  );
  const [yearsOfExperience, setyearsOfExperience] = useState(
    user.yearsOfExperience
  );
  const [techStack, settechStack] = useState(user.techStack);
  const [techStackInput, settechStackInput] = useState();
  const [interestedTechStack, setinterestedTecStack] = useState(
    user.interestedTechStack
  );
  const [interestedTechStackInput, setinterestedTechStackInput] = useState();
  const [image, setimage] = useState(user.image);
  const [city, setcity] = useState(user.city);
  const [about, setabout] = useState(user.about);
  const [subjects, setSubjects] = useState(user.subjects);
  const [subjectsInput, setSubjectsInput] = useState("");
  const [isSJSUStudent, setIsSJSUStudent] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {}, [
    techStackInput,
    techStack,
    interestedTechStackInput,
    interestedTechStack,
    image,
    isSJSUStudent,
  ]);

  const handleIsSJSUStudent = (e) => {
    setIsSJSUStudent(e.target.checked);
  };
  const handleFirstNameChange = (e) => {
    setfirstName(e.target.value);
  };
  const handlelastNameChange = (e) => {
    setlastName(e.target.value);
  };
  const handleemailIdChange = (e) => {
    setemailId(e.target.value);
  };
  const handlepasswordChange = (e) => {
    setpassword(e.target.value);
  };
  const handleageChange = (e) => {
    setage(e.target.value);
  };
  const handlegithubUsernameChange = (e) => {
    setgithubUsername(e.target.value);
  };
  const handleleetCodeUsernameChange = (e) => {
    setleetCodeUsername(e.target.value);
  };
  const handleyearsOfExperienceChange = (e) => {
    setyearsOfExperience(e.target.value);
  };

  const handletechStackInputChange = (e) => {
    settechStackInput(e.target.value);
  };
  const handleSubjectInputChange = (e) => {
    setSubjectsInput(e.target.value);
  };
  const handleInterestedtechStackInputChange = (e) => {
    setinterestedTechStackInput(e.target.value);
  };
  const onKeyDownHandlerTechStack = (e) => {
    const { key } = e;
    if (key === " ") {
      e.preventDefault();
      settechStack((techStack) => [...techStack, techStackInput]);
      console.log("tech Stack is " + techStack);
      settechStackInput("");
    }
  };
  const onKeyDownHandlerInterestedTechStack = (e) => {
    const { key } = e;
    if (key === " ") {
      e.preventDefault();
      setinterestedTecStack((interestedTechStack) => [
        ...interestedTechStack,
        interestedTechStackInput,
      ]);
      console.log("tech Stack is " + interestedTechStack);
      setinterestedTechStackInput("");
    }
  };
  const onKeyDownHandlerSubjects = (e) => {
    const { key } = e;
    if (key === " ") {
      e.preventDefault();
      setSubjects((subjects) => [...subjects, subjectsInput]);
      setSubjectsInput("");
    }
  };
  const handlecityChange = (e) => {
    setcity(e.target.value);
  };
  const handleaboutChange = (e) => {
    setabout(e.target.value);
  };
  const removeSubjectsHandler = (e) => {
    e.preventDefault();
    const removeTag = e.currentTarget.value;
    const filtered = subjects.filter((tag) => tag != removeTag);
    setSubjects(filtered);
  };
  const removeTagHandler = (e) => {
    e.preventDefault();
    const removeTag = e.currentTarget.value;
    const filtered = techStack.filter((tag) => tag != removeTag);
    settechStack(filtered);
  };
  const removeIntrestedTagHandler = (e) => {
    e.preventDefault();
    const removeTag = e.currentTarget.value;
    const filtered = interestedTechStack.filter((tag) => tag != removeTag);
    //console.log("filtered:", filtered)
    setinterestedTecStack(filtered);
  };

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      // setTempImage(e.target.files[0]);
      if (e.target.files[0] != null) {
        console.log(e.target.files[0]);
        const storageRef = ref(storage_bucket, e.target.files[0].name);
        // 'file' comes from the Blob or File API
        uploadBytes(storageRef, e.target.files[0])
          .then((snapshot) => {
            return getDownloadURL(snapshot.ref);
          })
          .then((downloadURL) => {
            console.log("Download URL", downloadURL);
            setimage(downloadURL);
          });
      }
    }
  };

  const handleSaveChanges = (e) => {
    const userInfo = {
      _id: user._id,
      firstName: firstName,
      lastName: lastName,
      // emailId: emailId,
      // password: password,
      age: age,
      githubUsername: githubUsername,
      leetCodeUsername: leetCodeUsername,
      yearsOfExperience: yearsOfExperience,
      techStack: techStack,
      interestedTechStack: interestedTechStack,
      subjects: subjects,
      image: image,
      city: city,
      about: about,
    };
    console.log(" user info is : " + JSON.stringify(userInfo));
    // axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    // axios.defaults.withCredentials = true;
    axios.post(url + "/users/updateUser", userInfo).then((response) => {
      console.log("Status Code : ", response.status);
      if (response.data) {
        console.log("data : ", JSON.stringify(response.data));
        alert("User information updated successfully");
        setUser(response.data);
        localStorage.setItem("currentUser", JSON.stringify(response.data));
      }
    });
  };

  return (
    <Container>
      <div className="container bootstrap snippets bootdey">
        <Typography component="h1" variant="h5">
          Profile
        </Typography>
        <hr />
        <div className="row">
          <div className="col-md-9 personal-info">
            <div className="col-lg-8">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    autoComplete="given-name"
                    name="firstName"
                    required
                    fullWidth
                    id="firstName"
                    value={firstName}
                    label="First Name"
                    onChange={handleFirstNameChange}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    value={lastName}
                    autoComplete="family-name"
                    onChange={handlelastNameChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={emailId}
                    onChange={handleemailIdChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="age"
                    label="Age"
                    id="age"
                    value={age}
                    autoComplete="age"
                    onChange={handleageChange}
                  />
                </Grid>
                <FormControlLabel
                  control={<Checkbox />}
                  label="Are You a SJSU Student"
                  onChange={handleIsSJSUStudent}
                />

                {isSJSUStudent && (
                  <Grid item xs={12}>
                    <div className="pb-2">
                      {subjects.map((tag) => {
                        return (
                          <Button
                            value={tag}
                            style={{
                              color: "#39739D",
                              backgroundColor: "#E1ECF4",
                              marginLeft: "8px",
                              borderColor: "#E1ECF4",
                            }}
                            onClick={removeSubjectsHandler}
                          >
                            {tag} <FiX value={tag} style={{ strokeWidth: 3 }} />
                          </Button>
                        );
                      })}
                    </div>
                    <TextField
                      required
                      fullWidth
                      name="subjects"
                      label="Please enter enrolled subjects"
                      id="subjects"
                      autoComplete="subjects"
                      onChange={handleSubjectInputChange}
                      onKeyDown={onKeyDownHandlerSubjects}
                      value={subjectsInput}
                    />
                  </Grid>
                )}

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="githubUsername"
                    label="Github User Name"
                    id="githubUsername"
                    autoComplete="githubUsername"
                    value={githubUsername}
                    onChange={handlegithubUsernameChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="leetCodeUsername"
                    label="Leet Code Username"
                    id="leetCodeUsername"
                    value={leetCodeUsername}
                    autoComplete="leetCodeUsername"
                    onChange={handleleetCodeUsernameChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="yearsOfExperience"
                    label="Years of Experience"
                    value={yearsOfExperience}
                    id="yearsOfExperience"
                    autoComplete="yearsOfExperience"
                    onChange={handleyearsOfExperienceChange}
                  />
                </Grid>

                <Grid item xs={12}>
                  <div className="pb-2">
                    {techStack.map((tag) => {
                      return (
                        <Button
                          value={tag}
                          style={{
                            color: "#39739D",
                            backgroundColor: "#E1ECF4",
                            marginLeft: "8px",
                            borderColor: "#E1ECF4",
                          }}
                          onClick={removeTagHandler}
                        >
                          {tag} <FiX value={tag} style={{ strokeWidth: 3 }} />
                        </Button>
                      );
                    })}
                  </div>
                  <TextField
                    required
                    fullWidth
                    name="techStack"
                    label="Used Tech Stack"
                    id="techStack"
                    autoComplete="techStack"
                    onChange={handletechStackInputChange}
                    onKeyDown={onKeyDownHandlerTechStack}
                    value={techStackInput}
                  />
                </Grid>

                <Grid item xs={12}>
                  <div className="pb-2">
                    {interestedTechStack.map((tag) => {
                      return (
                        <Button
                          value={tag}
                          style={{
                            color: "#39739D",
                            backgroundColor: "#E1ECF4",
                            marginLeft: "8px",
                            borderColor: "#E1ECF4",
                          }}
                          onClick={removeIntrestedTagHandler}
                        >
                          {tag} <FiX value={tag} style={{ strokeWidth: 3 }} />
                        </Button>
                      );
                    })}
                  </div>
                  <TextField
                    fullWidth
                    name="interestedTechStack"
                    label="Interested Tech Stack"
                    id="interestedTechStack"
                    autoComplete="interestedTechStack"
                    onChange={handleInterestedtechStackInputChange}
                    onKeyDown={onKeyDownHandlerInterestedTechStack}
                    value={interestedTechStackInput}
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="city"
                    label="City"
                    value={city}
                    id="city"
                    autoComplete="city"
                    onChange={handlecityChange}
                  />
                </Grid>
              </Grid>
            </div>
            <br />
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleSaveChanges}
            >
              Update Account
            </button>
          </div>
          <div className="col-md-3">
            <center>
              <div className="text-center col-md-9">
                <img
                  src={image}
                  className="avatar img-circle img-thumbnail"
                  alt="avatar"
                />
                <h6>Upload a different photo...</h6>
                <input
                  type="file"
                  className="form-control"
                  onChange={handleImageChange}
                />
              </div>
            </center>

            <br />
            <>Tell Us about yourself : </>
            <br />
            <br />
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                value={about}
                name="about"
                label="About me"
                id="about"
                autoComplete="about"
                multiline
                minRows={3}
                maxRows={5}
                onChange={handleaboutChange}
              />
            </Grid>
          </div>
        </div>
      </div>
      <hr />
    </Container>
  );
}

export default UserProfile;
