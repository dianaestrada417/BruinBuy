import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
} from './NavbarElements';
import myLogo from './bruinBuyLogoWhite.png';

const Navbar = () => {
    return (
      <>
        <Nav className="container-fluid">
          <Bars></Bars>
          <img src={myLogo} alt="Logo" height={70} width={60} />
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
        </Nav>
      </>
    );
  };
    
  export default Navbar;