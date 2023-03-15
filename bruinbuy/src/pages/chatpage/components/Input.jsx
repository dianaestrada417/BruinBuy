import React, {useContext, useState} from "react";
import { UserContext } from "../../../contexts/UserContext";
import { ChatContext } from "../../../contexts/ChatContext";
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase-config";
import {v4 as uuid} from 'uuid';


const Input = () => {
    const [text, setText] = useState('')

    const {User} = useContext(UserContext)
    const { data } = useContext(ChatContext)

    const handleKey = (e) => {
        e.code === "Enter" && handleSend()
    }
    
    const handleSend = async () => {
        if(text !== '')
        {
            await updateDoc(doc(db,"chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(), 
                    text,
                    senderId: User,
                    date: Timestamp.now()
                }),
            });

        await updateDoc(doc(db, "userChats", User), {
            [data.chatId + ".lastMessage"]: {
                text,
              },
              [data.chatId + ".date"]: serverTimestamp(),
            });
        

        await updateDoc(doc(db, "userChats", data.user.uid), {
            [data.chatId + ".lastMessage"]: {
                text,
              },
              [data.chatId + ".date"]: serverTimestamp(),
            });

        }
            
        setText('')
    }

    return(
        <div className="input">
            <input type='text' placeholder='Type something...' onChange={e=>setText(e.target.value)} value={text} onKeyDown={handleKey}/>
            <div className="send">
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}

export default Input