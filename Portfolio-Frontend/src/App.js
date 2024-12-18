import React from 'react';
import DynamicBackground from './utils/dynamicBackground';
import Experience from './components/Experience';
import Projects from './components/Projects';
import TechStack from './components/TechStack';
import './App.css';

function App() {
  return (
    <div>
      {/* Dynamic Background Component */}
      <DynamicBackground />

      {/* Main Content */}
      <div className="content">
        <Experience />
        <TechStack />
        <Projects />
      </div>
    </div>
  );
}

export default App;
