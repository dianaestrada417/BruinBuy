import React, {useState} from 'react'
import { collection, query, where} from "firebase/firestore"
import {db} from "./chat.js"

const Search = () => {
    const[fullname, setFullname] = useState("")
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

    return(
        <div className='search'>
            <div className='searchForm'>
                <input type='text' placeholder='Find a user' onKeyDown={handleKey} onChange={e=>setFullname(e.target.value)}/>
            </div>
            <div className='userChat'>

            </div>
        </div>
    )
}