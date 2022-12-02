import axios from "../../config/axios";
import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import "./CSS/ChatScreen.css";
import { deepOrange } from "@mui/material/colors";
import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { formatDayTime } from "../../utils/helperFuncs";
import url from "../../config/server";

const ChatScreen = () => {
  const [input, setInput] = useState([]);
  const userId = localStorage.getItem("user_id");
  const [messages, setMessages] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchAllMessage = async () => {
      const fetchedMessages = await axios.get(
        url + "/messages/all/" + userId + "_" + location.state.matchUserId
      );
      console.log("AllMessage", fetchedMessages);
      if (fetchedMessages.data && fetchedMessages.data.length !== 0) {
        setMessages([...messages, ...fetchedMessages.data]);
      }
    };

    fetchAllMessage();
    console.log("all messages");
  }, []);

  const handleSend = (e) => {
    e.preventDefault();
    if (input && input !== " ") {
      const data = {
        toId: location.state.matchUserId,
        fromId: userId,
        message: input,
        timeStamp: new Date(),
      };
      axios
        .post(url + "/messages", data)
        .then((response) => {
          console.log("Message Saved :", response.data);
          setMessages([...messages, response.data]);
          setInput("");
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setInput("");
  };
  return (
    <div className="chatScreen">
      <p className="chatScreen__timestamp">
        You Matched with {location.state.name} on{" "}
        {formatDayTime(location.state.matchTime)}
      </p>
      {messages.map((message) =>
        message.fromId === location.state.matchUserId ? (
          <div key={message._id} className="chatScreen__message">
            <Avatar
              className="chatScreen__image"
              alt={location.state.name}
              src={location.state.image}
              sx={{ bgcolor: deepOrange[500] }}
            />
            <p className="chatScreen__text">{message.message}</p>
            <small>{formatDayTime(message.timeStamp)}</small>
          </div>
        ) : (
          <div id={message._id} className="chatScreen__messageUser">
            <p className="chatScreen__Usertext">{message.message}</p>
            <small>{formatDayTime(message.timeStamp)}</small>
          </div>
        )
      )}

      <form className="chatScreen__inputContainer">
        <input
          className="chatScreen__inputField"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          type="text"
          placeholder="Type a message"
        />
        <button
          className="chatScreen__inputButton"
          type="submit"
          onClick={handleSend}
        >
          SEND
        </button>
      </form>
    </div>
  );
};

export default ChatScreen;
