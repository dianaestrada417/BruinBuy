import React, {useState} from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu
} from './NavbarElements';
import myLogo from './bruinBuyLogoWhite.png';
import './index.css'

const Navbar = () => {
  const [isNavExpanded, setIsNavExpanded] = useState(false)
    return (
      <>
        <Nav>
            <Bars className="toggle"
            onClick={() => {
              setIsNavExpanded(!isNavExpanded);
            }}></Bars>
            <img src={myLogo} alt="Logo" height={70} width={60} />
            
            <div className={isNavExpanded ? "navigation-menu expanded" : "navigation-menu"}>
              <NavMenu>
                <NavLink to='/home' activeStyle>
                BruinBuy
                </NavLink>
                <NavLink to='/marketplace' activeStyle>
                  MarketPlace
                </NavLink>
                <NavLink to='/chat' activeStyle>
                  Chat
                </NavLink>
                <NavLink to='/profile' activeStyle>
                  Profile
                </NavLink>
                <NavLink to='/login' activeStyle>
                  Login
                </NavLink>
                <NavLink to='/signup' activeStyle>
                  Sign Up
                </NavLink>
              </NavMenu>
              
              </div>
        </Nav>
      </>
    );
  };
    
  export default Navbar;