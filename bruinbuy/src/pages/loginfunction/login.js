import React, {useState, useContext, useId, useEffect} from 'react';
import { useNavigate } from "react-router-dom";
import 'firebase/compat/firestore';
import firebase from 'firebase/compat/app';
import { query, where, collection, getDocs, FieldPath, FieldValue } from "firebase/firestore"; 
import { UserContext } from '../../contexts/UserContext';
import './login.css'

const Login = () => {
  const { User, setUser } = useContext(UserContext);
  return (
    <div>
      <section>
        {User ? <LoginSuccess/>: <NoLogin/>}
      </section>
    </div>
  )
}

const LoginSuccess = () => {
  return (
    <>
    <div>
        <tr>
        <td height="75"></td>
        </tr>
      </div>
      
      <div>
        <h1>You are already logged in. Head to the Marketplace Page to view products for sale or go to the Profile Page to logout!</h1>
      </div>
    </>
  )
}

const NoLogin = () => {
  const db = firebase.firestore();
  const UserRef = collection(db, "signups");
  
  const [errorMessage, setErrorMessage] = useState("");

  const [email, setEmail] = useState("");
  const [password,setPassword] = useState("");

  const { User, setUser } = useContext(UserContext);

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
      setUser(doc.id);
      localStorage.setItem('user', doc.id);
      navigate('/profile');
    });
    console.log(User)
    //if not, send error message
    if(!querySnapshot.docs.length){
      setErrorMessage("Incorrect username or password");
    }
  }

  useEffect(() => {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      setUser(loggedInUser);
    }
  }, []);

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
