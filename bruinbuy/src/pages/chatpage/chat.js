import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import './chat.css'
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import { UserContext } from '../../contexts/UserContext';
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

export default Chat;