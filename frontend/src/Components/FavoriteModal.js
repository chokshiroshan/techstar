import axios from "axios";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function FavoriteModal(props) {
  const [show, setShow] = useState(props.show);
  const handleShow = () => setShow(true);
  const [message, setMessage] = useState("");

  //Closing the modal
  const handleClose = () => {
    setMessage("");
    setShow(false);
  };

  //submit Login handler to send a request to the node backend
  const favoritebuttonclick = (e) => {
    setMessage("Not Interested");
    handleShow();
    setTimeout(() => {
      handleClose();
    }, 700);
  };

  return <></>;
}
