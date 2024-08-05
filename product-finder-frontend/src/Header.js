// src/Header.js
import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-left">
        <h1 className="header-title">Product Finder</h1>
      </div>
      <div className="header-right">
        <nav>
          <ul>
            <li><a href="#about">About Me</a></li>
            <li><a href="https://github.com/your-username" target="_blank" rel="noopener noreferrer">GitHub</a></li>
            <li><a href="https://www.linkedin.com/in/your-username" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
