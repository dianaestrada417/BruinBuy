import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';
import myLogo from './bruinBuyLogoWhite.png';

const Navbar = () => {
    return (
      <>
        <Nav className="container-fluid">
          <Bars></Bars>
          <NavMenu>
            <NavLink to='/home' activeStyle>
            Bruin
            <img src={myLogo} alt="Logo" height={70} width={60} />
            Buy
            </NavLink>
            <NavLink to='/about' activeStyle>
              About
            </NavLink>
            <NavLink to='/marketplace' activeStyle>
              MarketPlace
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
            {/* Second Nav */}
            {/* <NavBtnLink to='/sign-in'>Sign In</NavBtnLink> */}
          </NavMenu>
        </Nav>
      </>
    );
  };
    
  export default Navbar;