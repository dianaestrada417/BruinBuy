import React, {useState, document, useId} from 'react';
import { useNavigate } from "react-router-dom";
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';
import { query, where, collection, getDocs, FieldPath, FieldValue } from "firebase/firestore"; 
import './login.css'

//this is the global variable with all the user info
export var user = {
  id: null,
  firstname: null,
  lastname: null,
  fullname: null,
  email: null
};

const Login = () => {
  const db = firebase.firestore();
  const UserRef = collection(db, "signups");
  
  const [errorMessage, setErrorMessage] = useState("");

  const [email, setEmail] = useState("");
  const [password,setPassword] = useState("");

  let navigate = useNavigate();

  const handleInputChange = (e) => {
    const {id , value} = e.target;
    if(id === "email"){
        setEmail(value);
    }
    if(id === "password"){
        setPassword(value);
    }
  }

  const handleSubmit = async() => {
    //create search query
    const q = query(UserRef, where("email", "==", email), where("password", "==", password));
    const querySnapshot = await getDocs(q);

    //if there is match, update global variable
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setErrorMessage("");
      user.id = doc.id;
      user.firstname = doc.data()["firstName"];
      user.lastname = doc.data()["lastName"];
      user.fullname = user.firstname + " " + user.lastname;
      user.email = doc.data()["email"];
      navigate('/profile');
    });
    
    //if not, send error message
    if(!querySnapshot.docs.length){
      setErrorMessage("Incorrect username or password");
    }
  }

  return (
      <>
      <div>
        <tr>
        <td height="75"></td>
        </tr>
      </div>
      
      <div className="form">
          <div className="form-body">
              <div className="email">
                  <label className="form__label" for="email">Email </label>
                  <input  type="email" id="email" className="form__input" value={email} onChange = {(e) => handleInputChange(e)} placeholder="Email"/>
              </div>
              <div className="password">
                  <label className="form__label" for="password">Password </label>
                  <input className="form__input" type="password"  id="password" value={password} onChange = {(e) => handleInputChange(e)} placeholder="Password"/>
              </div>
              <div>
                <label className="error__label"> {errorMessage} </label>
              </div>
          </div>
          <div class="footer">
            <button onClick={()=>handleSubmit()} type="submit" class="btn">Log in</button>
          </div>
      </div>  
      </> 
  );
};
  
export default Login;
