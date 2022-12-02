import axios from "../../config/axios";
import React, { useEffect, useState } from "react";
import "./CSS/Chats.css";
import ChatRow from "./ChatRow";
import url from "../../config/server";

const Chats = () => {
  // const [matchIds, setMatchIds] = useState([]);
  const userId = localStorage.getItem("user_id");
  const [matchData, setMatchData] = useState([]);

  useEffect(() => {
    const fetchIds = async () => {
      if (userId) {
        const req = await axios.get(url + "/matches/" + userId);
        if (req.data && req.data.length !== 0) {
          console.log("req data:", req.data);
          const Ids = req.data.map((arr) =>
            arr.user1Id === userId
              ? {
                  matchId: arr.user2Id,
                  matchTime: arr.matchTimeStamp,
                }
              : {
                  matchId: arr.user1Id,
                  matchTime: arr.matchTimeStamp,
                }
          );
          console.log("ids", Ids);
          setMatchData([...matchData, ...Ids]);
        }
      }
    };
    fetchIds();
  }, []);

  return matchData.length === 0 ? (
    <div className="noChats">
      <h3>No Matches Yet</h3>
    </div>
  ) : (
    <div className="chats">
      {matchData.map((match) => (
        <ChatRow
          key={match.matchId}
          matchId={match.matchId}
          matchTime={match.matchTime}
          // profilePic="https://i.mydramalist.com/QL1o6_5f.jpg"
        />
      ))}
    </div>
  );
};

export default Chats;
