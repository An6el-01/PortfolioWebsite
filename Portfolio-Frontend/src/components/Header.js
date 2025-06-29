import React from 'react';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="main-header">
      <div className="header-logo">Welcome!</div>
      <nav className="header-nav">
        <a href="#about">About</a>
        <a href="#techstack">Tech Stack</a>
        <a href="#projects">Projects</a>
        <a href="#experience">Experience</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
};

export default Header; 