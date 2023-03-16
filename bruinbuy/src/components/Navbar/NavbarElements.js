import { FaBars } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

export const Nav = styled.nav`
  position: fixed;
  background: #071330;
  height: 75px;
  display: flex;
  padding: 0.3rem calc((100vw - 1000px) / 2);
  z-index: 25;
  align-items: center;
  right: 0;
  left: 0;
  text-align: right;
`;
  
export const NavLink = styled(Link)`
  color: #FFFFFF;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-size: 1rem;
  padding: 0 3rem;
  height: 100%;
  cursor: pointer;
  &:hover {
    color: #ADD8E6
  }
  &.active {
    color: #FFC000;
  }
  @media screen and (max-width: 900px) {
    color: #071330;
    width: 100%;
    font-size: 1.3rem;
  }
`;
  
export const Bars = styled(FaBars)`
  display: none;
  color: #FFFF00;
  @media screen and (max-width: 900px) {
    height: 30px;
    width: 30px;
    padding: 0.5rem;
    cursor: pointer;
    position: absolute;
    top: 50%;
    right: 25px;
    transform: translateY(-50%);
    display: block;
    &:hover {
      color: #ADD8E6
    }
  }
`;
  
export const NavMenu = styled.div`
display: flex;
  align-items: center;
  margin-right: -24px;
  /* Second Nav */
  /* margin-right: 24px; */
  /* Third Nav */
  /* width: 100vw;
  white-space: nowrap; */
  @media screen and (max-width: 900px) {
    position: absolute;
    top: 83px;
    left: 0;
    flex-direction: column;
    width: 100%;
    height: calc(100vh - 77px);
    background-color: white;
    border-top: 1px solid black;
  }
`;



  
