import React from 'react';
import {useState, useEffect} from 'react';
import {db} from '../firebase-config';
import {collection, getDocs} from 'firebase/firestore';
import './chat.css'
  
function Chat() {
    return (
        <div>
        <h1>Have questions...Contact a seller here!</h1>
    </div>
  );
};
  
export default Chat;