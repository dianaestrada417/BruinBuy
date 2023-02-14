import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink,
} from './NavbarElements';

const Navbar = () => {
    return (
      <>
        <Nav>
          <Bars></Bars>
    
          <NavMenu>
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