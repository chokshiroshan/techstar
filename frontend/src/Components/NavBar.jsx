import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import "./NavBar.css";
import logo from "../assets/logo4.png";
import { FaBars, FaTimes } from "react-icons/fa";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import ForumIcon from "@mui/icons-material/Forum";
import Login from "./Login/Login";

const NavBar = () => {
  // const classes=useStyles();
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);
  const [openModal, setOpenModal] = useState(false);
  const [search, setSearch] = useState();
  var loggedin = false; //to handle

  const handleLogin = () => {
    console.log("inside login function");
    setOpenModal(true);
    //localStorage.clear();
    //window.open("/login", "_self");
  };
  const handleLogOut = () => {
    console.log("inside logut function");
    localStorage.clear();
    window.open("/findyourtechstar", "_self");
  };

  const closeMenu = () => setClick(false);
  if (localStorage.getItem("token")) {
    loggedin = true;
  }

  return (
    <div className="header">
      <nav className="navbar">
        <a href="/findyourtechstar" className="logo">
          <img src={logo} alt="logo" />
        </a>
        {/* <div className='hamburger' onClick={handleClick}>
                {click ? (<FaTimes size={30} style={{ color: '#ffffff' }} />)
                    : (<FaBars size={30} style={{ color: '#ffffff' }} />)}

            </div> */}

        <div>
          {loggedin && (
            <Button
              size="large"
              startIcon={<PeopleOutlineIcon />}
              component={Link}
              to="/swipefilter"
            />
          )}

          {loggedin && (
            <Button
              size="large"
              startIcon={<ForumIcon />}
              component={Link}
              to="/chats"
            />
          )}
          {loggedin && (
            <Button
              size="large"
              startIcon={<AccountCircleIcon />}
              component={Link}
              to="/profile"
            />
          )}
          {!loggedin && (
            <Button
              variant="contained"
              className="login-button"
              onClick={handleLogin}
            >
              Log in
            </Button>
          )}
          {loggedin && (
            <Button
              variant="contained"
              className="login-button"
              onClick={handleLogOut}
            >
              Log Out
            </Button>
          )}
        </div>
      </nav>
      {openModal && <Login closeModal={setOpenModal} />}
    </div>
  );
};

export default NavBar;
