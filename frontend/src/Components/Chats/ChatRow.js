import axios from "../../config/axios";
import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import "./CSS/ChatRow.css";
import { Link, useNavigate } from "react-router-dom";
import { formatDateAgo } from "../../utils/helperFuncs";
import url from "../../config/server";

const ChatRow = ({ matchId, matchTime }) => {
  const [matchUserData, setMatchUserData] = useState({});
  const [lastMessageData, setLastMessageData] = useState({});
  const userId = localStorage.getItem("user_id");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const matchUser = await axios.get(url + "/users/" + matchId);
      console.log("matchUser", matchUser);
      if (matchUser.data && matchUser.data.length !== 0) {
        setMatchUserData(matchUser.data);
      }
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const fetchLastMessage = async () => {
      const lastMessage = await axios.get(
        url + "/messages/last/" + userId + "_" + matchId
      );
      console.log("lastMessage", lastMessage.data.length);
      if (lastMessage.data && lastMessage.data.length !== 0) {
        setLastMessageData(lastMessage.data[0]);
      }
    };
    fetchLastMessage();
  }, []);

  return (
    // <Link to={`/chats/${matchUserData.userId}`}>
    <div
      className="chatRow"
      onClick={() =>
        navigate("/chatscreen", {
          state: {
            matchUserId: matchUserData._id,
            name: matchUserData.firstName + " " + matchUserData.lastName,
            image: matchUserData.image,
            matchTime: matchTime,
          },
        })
      }
    >
      <Avatar
        className="chatRow__image"
        sx={{ bgcolor: deepOrange[500] }}
        alt={matchUserData.firstName}
        src={matchUserData.image}
      />
      <div className="chatRow__details">
        <h5>{matchUserData.firstName + " " + matchUserData.lastName}</h5>
        <p>
          {lastMessageData.message !== undefined
            ? lastMessageData.message
            : "No Messages yet"}
        </p>
      </div>
      <p className="chatRow__timestamp">
        {lastMessageData.timeStamp !== undefined
          ? formatDateAgo(lastMessageData.timeStamp) + " ago"
          : ""}
      </p>
    </div>
    // </Link>
  );
};

export default ChatRow;
