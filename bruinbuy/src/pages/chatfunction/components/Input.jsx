import React, {useContext, useState} from "react";
import Img from './img.png'
import Attachment from './attach.png'
import { UserContext } from "../../../contexts/UserContext";
import { ChatContext } from "../../../contexts/ChatContext";
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from "firebase/firestore";
import { db } from "../../../firebase-config";
import {v4 as uuid} from 'uuid';


const Input = () => {
    const [text, setText] = useState('')
    const [img, setImg] = useState(null)

    const {User} = useContext(UserContext)
    const { data } = useContext(ChatContext)
    const handleSend = async () => {
        if(img) {
            console.log("rand")
        } else {
            await updateDoc(doc(db,"chats", data.chatId), {
                messages: arrayUnion({
                    id: uuid(), 
                    text,
                    senderId: User,
                    date: Timestamp.now()
                }),
            });
        }

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

        setText('')
        setImg(null)
    }

    return(
        <div className="input">
            <input type='text' placeholder='Type something...' onChange={e=>setText(e.target.value)} value={text}/>
            <div className="send">
                <img src={Attachment}/>
                <input type='file' style={{display:'none'}} id='file' onChange={e=>setImg(e.target.files[0])}/>
                <label htmlFor='file'>
                    <img src={Img}/>
                </label>
                <button onClick={handleSend}>Send</button>
            </div>
        </div>
    )
}

export default Input