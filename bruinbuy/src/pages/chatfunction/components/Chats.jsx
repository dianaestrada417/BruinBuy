import { doc, onSnapshot, getDoc} from 'firebase/firestore';
import React, {useState, useEffect, useContext } from 'react'
import {db} from '../../../firebase-config';
import { UserContext } from '../../../contexts/UserContext';
import { ChatContext } from '../../../contexts/ChatContext';

const Chats = () => {
  const [chats, setChats] = useState([])
  const {User, getUser} = useContext(UserContext)
  const [chatUsername, setChatUsername] = useState('')
  const {chatUser, setChatUser} = useContext(ChatContext)

  useEffect(() => {
    const getUserChat = async () => {
        const userChatRef = doc(db, "userChats", User)
        const docSnap = await getDoc(userChatRef);
        setChats(docSnap.data())
        setChatUsername(docSnap.data().displayName)
        console.log(chatUsername)
    };

    getUserChat();
  }, []);

  const handleSelect = () => {
      const unsub = onSnapshot(doc(db, 'userChats', User), (doc) => {
        setChatUser(doc.data().displayName)
      })
      return unsub
  }

  console.log(chatUser)

  //onClick={() => handleSelect(chat[1].userInfo)}

    return (
      <div className='chats'>
          <div className='userChat' key={chats.combineID} onClick={()=>handleSelect()} >
            <div className='userChatInfo'>
              <span>{chats.displayName}</span>
              <p>{chats.lastMessage?.text}</p>
            </div>
          </div>
      </div>
    )
  }
  
export default Chats;