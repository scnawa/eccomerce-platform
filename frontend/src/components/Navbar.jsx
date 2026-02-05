import React from 'react';

import { Link } from 'react-router-dom';
import { FaHome, FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/**/}
        <Link to="/" className="navbar-logo">
          Random Logo
        </Link>
        
        <div className="navbar-search">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search..."
            className="search-input"
          />
        </div>

        <ul className="nav-icons">
          <li>
            <Link to="/" className="nav-icon">
              <FaHome />
            </Link>
          </li>
          <li>
            <Link to="/cart" className="nav-icon">
              <FaShoppingCart />
            </Link>
          </li>
          <li>
            <Link to="/profile" className="nav-icon">
              <FaUser />
            </Link>
          </li>
        </ul>
        
      </div>
    </nav>
  );
};

export default Navbar;