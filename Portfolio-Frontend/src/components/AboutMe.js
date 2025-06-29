import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';
import '../styles/AboutMe.css';

const AboutMe = () => {
  return (
    <section className="aboutme-hero glass-card compact-section" id="about">
      <div className="aboutme-hero-inner">
        <img
          src="http://localhost:5015/images/headshot.png"
          alt="Angel Salinas"
          className="aboutme-image-hero"
        />
        <h1 className="aboutme-hero-title">Angel Salinas</h1>
        <h2 className="aboutme-hero-role">Software Developer</h2>
        <p className="aboutme-hero-tagline">
          I like building impactful web & mobile apps that enhance user experiences and deliver real value.
        </p>
        <div className="aboutme-hero-socials">
          <a href="mailto:a.m.salinas1901@gmail.com" aria-label="Email"><FaEnvelope /></a>
          <a href="https://github.com/An6el-01" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><FaGithub /></a>
          <a href="https://www.linkedin.com/in/angelmsalinas/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><FaLinkedin /></a>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
