import React, { useContext, useState, useEffect } from 'react'
import { collection, query, where, getDocs, doc} from "firebase/firestore"
import { UserContext } from '../../../contexts/UserContext';
import {db} from '../../../firebase-config';

const Search = () => {

    const {User, getUser} = useContext(UserContext)
    const [userFullname, setUserFullname] = useState('');
    const[fullname, setFullname] = useState("")
    const[messageUser, setMessageUser] = useState(null)
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
                });
                setErr("")
            }catch(err){
                setErr(true)
            }

    }

    const handleKey = e=> {
        e.code === "Enter" && handleSearch()
    }

    /*const[fullname, setFullname] = useState("")
    const[user, setUser] = useState(null)
    const[err, setErr] = useState(false)

    const handleSearch = async () => {
        const q = query(
            collection(db, 'signups'), 
            where('fullName', "==", fullname)
            );

            try{
                const querySnapshot = await getDocs(q)
                querySnapshot.forEach((doc) => {
                    setUser(doc.data())
                });
            }catch(err){
                setErr(true)
            }

            
    }

    const handleKey = (e) =>{
        e.code === "Enter" && handleSearch()
    }
    placeholder='Find a user' onKeyDown={handleKey} onChange={e=>setFullname(e.target.value)}
    */

    return(
        <div className='search'>
            <div className='searchForm'>
                <input className='searchInput' type='text' placeholder='Find a user' onKeyDown={handleKey} onChange={(e)=>setFullname(e.target.value)} value={fullname} />
            </div>
            {err && <span>User not found</span>}
            {messageUser && <div className='userChat'>
                <div className='userChatInfo'>
                    <span>{messageUser.fullName}</span>
                </div>
            </div>}
        </div>
    )
}

export default Search;