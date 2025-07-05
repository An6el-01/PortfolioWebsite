import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import '../styles/Header.css';

const Header = () => {
  return (
    <header className="main-header">
      <div className="header-left">
        <span className="header-logo">Angel Salinas</span>
      </div>
      <nav className="header-nav">
        <a href="#work">WORK</a>
        <a href="#about">ABOUT</a>
        <a href="#contact">CONTACT</a>
        <a href="#resume">RESUME</a>
      </nav>
      <div className="header-icons">
        <a href="https://github.com/An6el-01" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <FaGithub />
        </a>
        <a href="https://www.linkedin.com/in/%C3%A1ngel-salinas-25a15a22a/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <FaLinkedin />
        </a>
      </div>
    </header>
  );
};

export default Header; 