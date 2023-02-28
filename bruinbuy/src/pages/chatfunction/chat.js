import React from 'react';
import './chat.css'
import {useState, useRef} from 'react';

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { toHaveFormValues } from '@testing-library/jest-dom/dist/matchers';

firebase.initializeApp({
  apiKey: "AIzaSyDhgKNzRyWb5C4S-m8pzsFu1c3nLLwOchI",
  authDomain: "bruinbuy-62dfe.firebaseapp.com",
  projectId: "bruinbuy-62dfe",
  storageBucket: "bruinbuy-62dfe.appspot.com",
  messagingSenderId: "172990838331",
  appId: "1:172990838331:web:52af9c82310d83a0450e1e",
  measurementId: "G-77H5X4WMQ6"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function Chat() {
  const[user] = useAuthState(auth)


    return (
      <div className='Chat'>
    <section>
    {user ? <ChatRoom /> : <SignIn />}
    </section>
    </div>
  );
};
  
function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }
  return (
    <button className='sign-in' onClick={signInWithGoogle}>Sign in with Google</button>
  )
}

function SignOut() {
  return auth.currentUser && (
    <button className='sign-out' onClick={() => auth.signOut()}>Sign Out</button>
  )
}

function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const[messages] = useCollectionData(query, {idField: 'id'})

  const [formValue, setFormValue] = useState('')

  const sendMessage = async(e) => {
    e.preventDefault();
    const{uid} = auth.currentUser;
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
    </main>

    <form onSubmit={sendMessage}>
      <input value={formValue} onChange={(e) => setFormValue(e.target.value)} placeholder='ask a question'/>
      <button type="submit" disabled={!formValue}></button>
    </form>
    </>
  )
}

function ChatMessage(props){
  const {text,uid} = props.message

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received'
  return(
    <>
    <div className={'message ${messageClass}'}>
      <p>{text}</p>
    </div>
    </>
  )
}

export default Chat;