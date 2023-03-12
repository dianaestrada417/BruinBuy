import React, { useContext, useState, useEffect } from "react";
import { UserContext } from '../../../contexts/UserContext';
import {db} from '../../../firebase-config';
import {getDoc, doc} from "firebase/firestore"; 

const Navbar = () => {

    const {User, getUser} = useContext(UserContext)
    const [userFullname, setUserFullname] = useState('');

    useEffect(() => {
        const getUserName = async () => {
            const userRef = doc(db, "signups", User)
            const docSnap = await getDoc(userRef);
            setUserFullname(docSnap.data().fullName)
        };
    
        getUserName();
      }, []);

    return (
      <div className='navbar'>
        <span className="logo">BruinBuy Chat</span>
        <div className="user">
          <span>{userFullname}</span>
        </div>
      </div>
    )
  }
  
  export default Navbar