import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
//import { ChatContext } from "../context/ChatContext";

//<span>{data.user?.displayName}</span>

const ChatBlock = () => {
  //const { data } = useContext(ChatContext);

  return (
    <div className="chatblock">
        <div className="chatInfo">
            <span>Jane</span>
        </div>
        <Messages/>
        <Input/>
    </div>
  );
};

export default ChatBlock;

