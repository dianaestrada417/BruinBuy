import './App.css';
import logo from './bruinBuyLogoWhite.png';
//do npm install rsuite everytime
import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Chat from './pages/chat';
import MarketPlace from './pages/marketplace';
import Profile from './pages/profile';
import Login from './pages/login';
import SignUp from './pages/signup';
//npm install react-icons --save

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
