import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Chat from './pages/chatfunction/chat';
import MarketPlace from './pages/marketplace';
import Profile from './pages/profile';
import Login from './pages/loginfunction/login';
import SignUp from './pages/signupfunction/signup';
import { UserContext } from './contexts/UserContext'
import { ChatContext } from './contexts/ChatContext'
//Use these commands before doing npm start
//npm install react-icons --save
//npm install react-router-dom
//npm install --save styled-components

function App() {
  const [User, setUser] = useState(null);
  const [chatUser, setChatUser] = useState('')

  const ProtectedRoute = ({ children }) => {
    return children
  }

  return (
    <div className="App">
      <UserContext.Provider value={{User, setUser}}>
        <ChatContext.Provider value={{chatUser, setChatUser}}>
        <Router>
          <Navbar> </Navbar>
          <Routes>
          <Route path='/home' exact element={<Home/>}></Route>
          <Route path='/marketplace' element={<MarketPlace/>}></Route>
          <Route path='/chat' element={<ProtectedRoute><Chat/></ProtectedRoute>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
          <Route path='/signup' element={<SignUp/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          </Routes>
        </Router>
        </ChatContext.Provider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
