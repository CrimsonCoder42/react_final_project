import React from 'react';
import {  Link } from "react-router-dom";

const Navbar= () =>{
  return (
  <div className="topnav">
    <li>
      <Link className="navLink" to="/">Home</Link>
    </li>
    <li>
      <Link className="navLink" to="/settings">Settings</Link>
    </li>
    <li>
      <Link className="navLink" to="/stats">Stats</Link>
    </li>
  </div>
  );
}
export default Navbar;