import React from 'react';
import Header from './components/Header';
import Background from './utils/background';
import Experience from './components/Experience';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import AboutMe from './components/AboutMe';
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
        <AboutMe />
        <Experience />
        <TechStack />
        <Projects />
      </div>
    </div>
  );
}

export default App;
