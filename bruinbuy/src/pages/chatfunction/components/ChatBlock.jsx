import React, { useContext, useState, useEffect } from "react";
import Messages from "./Messages";
import Input from "./Input";
import { ChatContext } from '../../../contexts/ChatContext';
import {db} from '../../../firebase-config';
import { doc, onSnapshot, collection, getDoc} from 'firebase/firestore';


const ChatBlock = () => {
  const {chatUser, setChatUser} = useContext(ChatContext)
  const [chatUsername, setChatUsername] = useState(null)
  const[chat, setChat] = useState([])

  return (
    <div className="chatblock">
        <div className="chatInfo">
              <span>{chatUser}</span>
        </div>
        <Messages/>
        <Input/>
     
    </div>
  );
};

export default ChatBlock;

