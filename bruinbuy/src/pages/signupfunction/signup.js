import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import React, {useState,useEffect, useContext} from 'react';
import './signup.css'
import { addDoc, collection, setDoc, doc, query, where, getDoc, getDocs } from "firebase/firestore"; 
import { UserContext } from '../../contexts/UserContext';

const app = firebase.initializeApp({
  apiKey: "AIzaSyDhgKNzRyWb5C4S-m8pzsFu1c3nLLwOchI",
  authDomain: "bruinbuy-62dfe.firebaseapp.com",
  projectId: "bruinbuy-62dfe",
  storageBucket: "bruinbuy-62dfe.appspot.com",
  messagingSenderId: "172990838331",
  appId: "1:172990838331:web:52af9c82310d83a0450e1e",
  measurementId: "G-77H5X4WMQ6"
})

function SignUp() {
    const [signup, setSignup] = useState(null)
    const {User, setUser} = useContext(UserContext)
    useEffect(() => {
        const signupSuccess = localStorage.getItem('success')
        if(signupSuccess === true || User) {
          setSignup(true);
        console.log(signupSuccess)
        }
    }, []);

    console.log(User)
    console.log(signup)
    return (
        <div className='Signup'>
            <section>
                {signup ? <PostSignUp /> : <SignUpForm />}
            </section>
      </div>
    );   
}

function SignUpForm() {
  const db = firebase.firestore();
  const signupRef = collection(db, "signups");
  
    const [firstName, setFirstName] = useState(null);
    const [lastName, setLastName] = useState(null);
    const [email, setEmail] = useState(null);
    const [password,setPassword] = useState(null);
    const [confirmPassword,setConfirmPassword] = useState(null);
    const [err, setErr] = useState(null)
    const [success, setSuccess] = useState(false)

    const handleInputChange = (e) => {
        setErr(null)
        const {id , value} = e.target;
        if(id === "firstName"){
            setFirstName(value);
        }
        if(id === "lastName"){
            setLastName(value);
        }
        if(id === "email"){
            setEmail(value);
        }
        if(id === "password"){
            setPassword(value);
        }
        if(id === "confirmPassword"){
            setConfirmPassword(value);
        }

    }

    const handleSubmit = async() => {
<<<<<<< HEAD
        const document = await addDoc(signupRef, {
            firstName : firstName,
            lastName: lastName,
            fullName: firstName + ' ' + lastName,
            email: email,
            password: password,
            confirmPassword: confirmPassword,
        })  
        await setDoc(doc(db, "userChats", document.id), {});
  };
=======
        console.log("inside")
        const q = query(signupRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);
        console.log(querySnapshot)
        if(!querySnapshot.docs.length) {
            if(password === confirmPassword) {
                await addDoc(signupRef, {
                    firstName : firstName,
                    lastName: lastName,
                    fullName: firstName + ' ' + lastName,
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword,
                })  
                .then(async function(docRef) {
                      await setDoc(doc(db, "userChats",docRef.id), {})
                })
                localStorage.setItem('success', true);
            } else {
                setErr("Passwords do not match")
            }
        } else {
            setErr("There is already an account with this email")
        } 
  }
>>>>>>> signupedits

    return(
      <>
      <div>
        <tr>
        <td height="75"></td>
        </tr>
      </div>
      
      <div className="form">
          <div className="form-body">
              <div className="username">
                  <label className="form__label" for="firstName">First Name </label>
                  <input className="form__input" type="text" value={firstName} onChange = {(e) => handleInputChange(e)} id="firstName" placeholder="First Name"/>
              </div>
              <div className="lastname">
                  <label className="form__label" for="lastName">Last Name </label>
                  <input  type="text" name="" id="lastName" value={lastName}  className="form__input" onChange = {(e) => handleInputChange(e)} placeholder="LastName"/>
              </div>
              <div className="email">
                  <label className="form__label" for="email">Email </label>
                  <input  type="email" id="email" className="form__input" value={email} onChange = {(e) => handleInputChange(e)} placeholder="Email"/>
              </div>
              <div className="password">
                  <label className="form__label" for="password">Password </label>
                  <input className="form__input" type="password"  id="password" value={password} onChange = {(e) => handleInputChange(e)} placeholder="Password"/>
              </div>
              <div className="confirm-password">
                  <label className="form__label" for="confirmPassword">Confirm Password </label>
                  <input className="form__input" type="password" id="confirmPassword" value={confirmPassword} onChange = {(e) => handleInputChange(e)} placeholder="Confirm Password"/>
              </div>
              <div>
                <errormsg className='err'>{err}</errormsg>
              </div>
          </div>
          <div class="footer">
            <button onClick={()=>handleSubmit()} type="submit" class="btn">Register</button>
          </div>
      </div>  
      </> 
    )     
}

function PostSignUp() {
    return (
        <>
        <div>
            <tr>
            <td height="75"></td>
            </tr>
        </div>
            <div className='signedup'>
                <h1> 
                    You are signed up or already logged in. Please head to the Login Page to login and start using your account if you are not logged in! If you are already logged in, head to the Marketplace Page to look at items for sale!
                </h1>
            </div>
        </>
    )
}

export default SignUp;