import React from 'react';
import {  Link } from "react-router-dom";

const Navbar= () =>{
  return (
  <div className="topnav">
    <li>
      <Link className="navLink" to="/">Study</Link>
    </li>
    <li>
      <Link className="navLink" to="/stats">Stats</Link>
    </li>
  </div>
  );
}
export default Navbar;