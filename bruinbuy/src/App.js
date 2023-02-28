import './App.css';
import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Chat from './pages/chatfunction/chat';
import MarketPlace from './pages/marketplace';
import Profile from './pages/profile';
import Login from './pages/login';
//Use these commands before doing npm start
import SignUp from './pages/signupfunction/signup';
//npm install react-icons --save
//npm install react-router-dom
//npm install --save styled-components

function App() {

  return (
    <div className="App">
      <Router>
        <Navbar> </Navbar>
        <Routes>
        <Route path='/home' exact element={<Home/>}></Route>
        <Route path='/marketplace' element={<MarketPlace/>}></Route>
        <Route path='/chat' element={<Chat/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
