import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './chat.css'
import {useState, useRef} from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { UserContext } from '../../contexts/UserContext';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import Sidebar from './components/Sidebar'
import ChatBlock from './components/ChatBlock'




function Chat() {  
  const {User, setUser} = React.useContext(UserContext)
  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

    return (
      <div className='Chat'>
    <section>
    {User ? <ChatRoom /> : <SignIn />}
    </section>
    </div>
  );
};
  
function SignIn() {
  let navigate = useNavigate();
  const navToLogin = () => {
    navigate('/login')
  }
  return (
    <button className='sign-in' onClick={navToLogin}>Login Before Using the Chat Page</button>
  )
}


function ChatRoom() {
  return (
    <>
    <div>
      <tr>
      <td height="50"></td>
      </tr>
    </div>

    <div className='chatroom'>
      <div className="container">
        <Sidebar/>
        <ChatBlock/>
      </div>
    </div>
    </>
  )}
  /*const dummy = useRef();
  const messagesRef = db.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);
  const {User, setUser} = React.useContext(UserContext)


  const[messages] = useCollectionData(query, {idField: 'id'})

  const [formValue, setFormValue] = useState('')

  const sendMessage = async(e) => {
    e.preventDefault();
    const uid = User;
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid
    })
    setFormValue('')
    dummy.current.scrollIntoView({ behavior: 'smooth'})
  }

  return (
    <>
    <main>
      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg}/>)}
      <span ref={dummy}></span>
      <Sidebar/>
    </main>

    <form onSubmit={sendMessage}>
      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder='ask a question'/>
      <button type="submit" disabled={!formValue}></button>
    </form>
    </>
  )
}

function ChatMessage(props){
  const {User, setUser} = React.useContext(UserContext)
  const {text,uid} = props.message

  const messageClass = uid === User ? 'sent' : 'received'
  return(
    <>
    <div className={'message ${messageClass}'}>
      <p>{text}</p>
    </div>
    </>
  )
}*/

export default Chat;