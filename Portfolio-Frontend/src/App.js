import React from 'react';
import Header from './components/Header';
import Background from './utils/background';
import Experience from './components/Experience';
import Projects from './components/Projects';
import AboutMe from './components/AboutMe';
import Hero from './components/Hero';
import './App.css';

function App() {
  return (
    <div>
      {/* Sticky Header Navigation */}
      <Header />
      {/* Dynamic Background Component */}
      <Background />
      {/* Main Content */}
      <div className="content">
        <Hero />
        <Projects />
        <AboutMe />
        <Experience />
      </div>
    </div>
  );
}

export default App;
