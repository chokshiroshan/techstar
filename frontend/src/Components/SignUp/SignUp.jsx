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



function SignUp() {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [emailId, setemailId] = useState("");
  const [password, setpassword] = useState("");
  const [phoneNo, setphoneNo] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState("");
  const [age, setage] = useState(0);
  const [qualification, setqualification] = useState("");
  const [governmentId, setgovernmentId] = useState("");
  const [githubUsername, setgithubUsername] = useState("");
  const [leetCodeUsername, setleetCodeUsername] = useState("");
  const [yearsOfExperience, setyearsOfExperience] = useState("");
  const [techStack, settechStack] = useState([]);
  const [techStackInput, settechStackInput] = useState();
  const [interestedTechStack, setinterestedTechStackStack] = useState([]);
  const [interestedTechStackInput, setinterestedTechStackStackInput] = useState();
  const [image, setimage] = useState("https://bootdey.com/img/Content/avatar/avatar7.png");
  const [city, setcity] = useState();
  const [country, setcountry] = useState();
  const [about, setabout] = useState();
  const [subjects, setSubjects] = useState([]);
  const [subjectsInput, setSubjectsInput] = useState("");
  const [isSJSUStudent, setIsSJSUStudent] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {}, [techStackInput, techStack, interestedTechStackInput, interestedTechStack, image, isSJSUStudent]);

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
  // const handlephoneNoChange = (e) => {
  //   setphoneNo(e.target.value);
  // };
  // const handledateOfBirthChange = (e) => {
  //   setdateOfBirth(e.target.value);
  // };
  const handleageChange = (e) => {
    setage(e.target.value);
  };
  // const handlequalificationChange = (e) => {
  //   setqualification(e.target.value);
  // };
  // const handlegovernmentIdChange = (e) => {
  //   setgovernmentId(e.target.value);
  // };

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
    setinterestedTechStackStackInput(e.target.value);
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
      setinterestedTechStackStack((interestedTechStack) => [
        ...interestedTechStack,
        interestedTechStackInput,
      ]);
      console.log("tech Stack is " + interestedTechStack);
      setinterestedTechStackStackInput("");
    }
  };
  const onKeyDownHandlerSubjects = (e) => {
    const { key } = e;
    if (key === " ") {
      e.preventDefault();
      setSubjects((subjects) => [
        ...subjects,
        subjectsInput,
      ]);
      setSubjectsInput("");
    }
  };
  // const handleimageChange = (e) => {
  //   setimage(e.target.value);
  // };
  const handlecityChange = (e) => {
    setcity(e.target.value);
  };
  // const handlecountryChange = (e) => {
  //   setcountry(e.target.value);
  // };
  const handleaboutChange = (e) => {
    setabout(e.target.value);
  };
  const removeSubjectsHandler = (e) => {
    e.preventDefault();
    const removeTag = e.currentTarget.value;
    const filtered = subjects.filter((tag) => tag != removeTag);
    //console.log("filtered:", filtered)
    setSubjects(filtered);
  };
  const removeTagHandler = (e) => {
    e.preventDefault();
    const removeTag = e.currentTarget.value;
    const filtered = techStack.filter((tag) => tag != removeTag);
    //console.log("filtered:", filtered)
    settechStack(filtered);
  };
  const removeIntrestedTagHandler = (e) => {
    e.preventDefault();
    const removeTag = e.currentTarget.value;
    const filtered = interestedTechStack.filter((tag) => tag != removeTag);
    //console.log("filtered:", filtered)
    setinterestedTechStackStack(filtered);
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
      firstName: firstName,
      lastName: lastName,
      emailId: emailId,
      password: password,
      // phoneNo: phoneNo,
      // dateOfBirth: dateOfBirth,
      age: age,
      // qualification: qualification,
      // governmentId: governmentId,
      githubUsername: githubUsername,
      leetCodeUsername: leetCodeUsername,
      yearsOfExperience: yearsOfExperience,
      techStack: techStack,
      interestedTechStack: interestedTechStack,
      subjects: subjects,
      image: image,
      city: city,
      // country: country,
      about: about,
    };
    console.log(" user info is : " + JSON.stringify(userInfo));
    // axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    // axios.defaults.withCredentials = true;
    axios.post(url + "/signUp", userInfo).then((response) => {
      console.log("Status Code : ", response.status);
      if (response.data === "User Already Exists") {
        console.log(
          "The given email id is already registered. Please continue to login or use different emailID"
        );
      }
      if (response.data === "User Created"){
        alert("User created successfully");
        navigate("/findyourtechstar");
      } 
    });
  };

  return (
    <Container>
      {/* <LandingNavBar /> */}
      <div className="container bootstrap snippets bootdey">
        <Typography component="h1" variant="h5">
          Sign up
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
                    onChange={handleemailIdChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                    onChange={handlepasswordChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="age"
                    label="Age"
                    id="age"
                    autoComplete="age"
                    onChange={handleageChange}
                  />
                </Grid>
                <FormControlLabel control={<Checkbox />} label="Are You a SJSU Student" 
                onChange={handleIsSJSUStudent}/>

                {isSJSUStudent && <Grid item xs={12}>
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
                </Grid>}

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="githubUsername"
                    label="Github User Name"
                    id="githubUsername"
                    autoComplete="githubUsername"
                    onChange={handlegithubUsernameChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="leetCodeUsername"
                    label="Leet Code Username"
                    id="leetCodeUsername"
                    autoComplete="leetCodeUsername"
                    onChange={handleleetCodeUsernameChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="yearsOfExperience"
                    label="Years of Experience"
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
              Create Account
            </button>
          </div>
          <div className="col-md-3">
            <center>
            <div className="text-center col-md-9" >
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
                    name="about"
                    label="About Me"
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

export default SignUp;
