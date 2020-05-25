import React from 'react';
import './Header.css';
import home from '../../assets/home.svg';
import { NavLink } from 'react-router-dom';

const  Header = () => {
  return (
    <div className="header">
      <NavLink to='/home'>
        <img src={home} alt=""/>
      </NavLink>
    </div>
  );
}

export default Header;
