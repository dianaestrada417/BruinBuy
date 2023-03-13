import React, { useContext, useState } from 'react'
import { collection, query, where, getDocs, doc, setDoc, updateDoc, serverTimestamp, getDoc} from "firebase/firestore"
import { UserContext } from '../../../contexts/UserContext';
import {db} from '../../../firebase-config';

const Search = () => {

    const {User} = useContext(UserContext)
    const[fullname, setFullname] = useState("")
    const[messageUser, setMessageUser] = useState(null)
    const[messageUserId, setMessageUserId] = useState(null)
    const[err, setErr] = useState(false)

    const handleSearch = async() => {
        const q = query(
            collection(db, 'signups'), 
            where('fullName', "==", fullname)
            );

            try{
                const querySnapshot = await getDocs(q)
                querySnapshot.forEach((doc) => {
                    setMessageUser(doc.data())
                    setMessageUserId(doc.id)
                });
            }catch(err){
                setErr(true)
            }

    }

    const handleKey = (e) => {
        e.code === "Enter" && handleSearch()
    }

    const handleSelect = async() => {
        const combineId = User > messageUserId 
        ? User + messageUserId: 
        User + messageUserId
        
        try {
            const res = await getDoc(doc(db, "chats", combineId))
            if(!res.exists()) {
                const docSnap = await getDoc(doc(db, "signups", User));

                await setDoc(doc(db,"chats", combineId),{messages:[]})

                await updateDoc(doc(db, "userChats", User),{
                    [combineId + ".userInfo"]: {
                        uid: messageUserId,
                        displayName: fullname
                      },
                      [combineId + ".date"]: serverTimestamp(),
                    });

                await updateDoc(doc(db,"userChats", messageUserId),{
                    [combineId + ".userInfo"]: {
                        uid: User,
                        displayName: docSnap.data().fullName
                      },
                      [combineId + ".date"]: serverTimestamp(),
                    });
            }
        } catch(err) { }
       
        setMessageUser(null)
        setMessageUserId(null)
        setFullname('')

    }

    return(
        <div className='search'>
            <div className='searchForm'>
                <input className='searchInput' type='text' placeholder='Find a user' onKeyDown={handleKey} onChange={(e)=>setFullname(e.target.value)} value={fullname} />
            </div>
            {err && <span>User not found</span>}
            {messageUser && (<div className='userChat' onClick={handleSelect}>
                <div className='userChatInfo'>
                    <span>{messageUser.fullName}</span>
                </div>
            </div>
            )}
        </div>
    )
}


export default Search;