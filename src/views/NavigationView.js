import React from 'react';
import './NavigationView.css';
import { Link, Outlet } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

export const NavigationView = () => {
  return (
    <>
      <div className='app-header'>
        <Link to="/" className='home-link'><FaHome /></Link>
        <h1>Max's Sporting Goods</h1>
      </div>
      <div className='app-body'>
        <Outlet />
      </div>
    </>
  )
}