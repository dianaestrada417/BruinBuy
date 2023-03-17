import './App.css';
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/homepage/home';
import Chat from './pages/chatpage/chat';
import MarketPlace from './pages/marketplacepage/marketplace';
import Profile from './pages/profilepage/profile';
import Login from './pages/loginpage/login';
import SignUp from './pages/signuppage/signup';
import { UserContext } from './contexts/UserContext'
import ChatContextProvider from './contexts/ChatContext'
import ItemInfoPage from './pages/itempage/itemInfo';

//Use these commands before doing npm start
//npm install react-icons --save
//npm install react-router-dom
//npm install --save styled-components

function App() {
  const [User, setUser] = useState(null);

  return (
    <div className="App">
      <UserContext.Provider value={{User, setUser}}>
        <ChatContextProvider>
          
          <Router>
            <Navbar> </Navbar>
            <Routes>
            <Route path='' exact element={<Home/>}></Route>
            <Route path='/home' exact element={<Home/>}></Route>
            <Route path='/marketplace' element={<MarketPlace/>}></Route>
            <Route path='/chat' element={<Chat/>}></Route>
            <Route path='/profile' element={<Profile/>}></Route>
            <Route path='/signup' element={<SignUp/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/item/:itemId/:agoString' element={<ItemInfoPage/>} />
            </Routes>
          </Router>
          
        </ChatContextProvider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
