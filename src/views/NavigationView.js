import React from 'react'
import { Link, Outlet } from 'react-router-dom';

export const NavigationView = () => {
  return (
    <>
      <h1>NavigationView</h1>
      <ul>
          <li><Link to="/read/1">Read</Link></li>
          <li><Link to="/create/1">Create</Link></li>
          <li><Link to="/update/1">Update</Link></li>
      </ul>

      <Outlet />
    </>
  )
}