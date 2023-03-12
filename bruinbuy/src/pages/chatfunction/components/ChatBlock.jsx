import React, { useContext } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from '../../../contexts/ChatContext';


const ChatBlock = () => {
  const { data } = useContext(ChatContext)
  
  return (
    <div className="chatblock">
        <div className="chatInfo">
          <span>{data.user?.displayName}</span>
        </div>
        <Messages/>
        <Input/>
     
    </div>
  );
};

export default ChatBlock;

