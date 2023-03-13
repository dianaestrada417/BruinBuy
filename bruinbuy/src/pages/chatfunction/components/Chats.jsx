import { doc, onSnapshot } from 'firebase/firestore';
import React, {useState, useEffect, useContext } from 'react'
import {db} from '../../../firebase-config';
import { UserContext } from '../../../contexts/UserContext';
import { ChatContext } from '../../../contexts/ChatContext';

const Chats = () => {
  const [chats, setChats] = useState([])
  const {User} = useContext(UserContext)
  const {dispatch} = useContext(ChatContext)

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", User), (doc) => {
        setChats(doc.data())
      })

    return () => {
      unsub()
    }
  }

    User && getChats()
  }, [User]);
  

  const handleSelect = (u) => {
      dispatch({ type: "CHANGE_USER", payload: u })
  }

    return (
      <div className='chats'>
        {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
          <div className='userChat' key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)} >
            <div className='userChatInfo'>
              <span>{chat[1].userInfo.displayName}</span>
              <p>{chat[1].lastMessage?.text}</p>
            </div>
          </div>
          ))}
      </div>
    )
  }
  
export default Chats;