import './App.css';
import "rsuite/dist/rsuite.min.css";
import { Placeholder } from "rsuite";
//do npm install rsuite everytime
import React from 'react';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages';
import About from './pages/about';
import MarketPlace from './pages/marketplace';
import Profile from './pages/profile';
import Login from './pages/login';
import SignUp from './pages/signup';
//npm install react-icons --save


function App() {

  const { Paragraph } = Placeholder;

  return (
    <div className="App">
       <header style={{backgroundColor: '#071330'}}>
        <h1 style={{color: '#FFFFFF'}}>BruinBuy</h1>
       </header>
      <Router>
        <Navbar> </Navbar>
        <Routes>
        <Route path='/' exact element={<Home/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/marketplace' element={<MarketPlace/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
