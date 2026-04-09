import React from 'react';
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

import { Link } from 'react-router-dom';
import { FaHome, FaShoppingCart, FaUser, FaSearch } from 'react-icons/fa';

import './Navbar.css';


const Navbar = () => {
  
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const toggleDropdown = () => {
    setOpen(!open);
  };


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  
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
            {/* Always show icon */}
          <button onClick={toggleDropdown} className="nav-icon">
            <FaUser />
          </button>

          {/* Dropdown */}
          <ul className={`dropdown-menu ${open ? "show" : ""}`}>
            
            {!user ? (
              <>
                <li>
                  <Link to="/login" onClick={() => setOpen(false)}>
                    Sign In
                  </Link>
                </li>
                <li>
                  <Link to="/register" onClick={() => setOpen(false)}>
                    Register
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/profile" onClick={() => setOpen(false)}>
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link to="/orders" onClick={() => setOpen(false)}>
                    My Orders
                  </Link>
                </li>
                <li>
                  <button onClick={logout}>
                    Logout
                  </button>
                </li>
              </>
            )}

          </ul>
          </li>
        </ul>
        
      </div>
    </nav>
  );
};

export default Navbar;