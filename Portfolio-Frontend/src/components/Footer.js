import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import '../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 className="footer-title">Angel Salinas</h3>
          <p className="footer-subtitle">Software Developer</p>
        </div>
        
        
        <div className="footer-section">
          <p className="footer-copyright">
            © {currentYear} Angel Salinas. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 