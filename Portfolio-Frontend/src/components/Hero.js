import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { FaMapMarkerAlt } from 'react-icons/fa';
import avatar from '../assets/avatar.png';
import moon from '../assets/moon.png';
import sunny from '../assets/sunny.png';
import mexico from '../assets/mexico.png';

const Hero = ({ isDarkMode, onToggleDarkMode }) => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          
          {/* Left Section - Text Content */}
          <div className="space-y-8 animate-fadeInUp ml-28">
            {/* Name */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white uppercase tracking-wide">
              Angel Salinas
            </h1>
            
            {/* Title */}
            <h2 className="text-xl sm:text-2xl lg:text-3xl text-white uppercase tracking-wider font-medium">
              Software Developer
            </h2>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a 
                href="https://linkedin.com/in/your-profile" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-colors duration-300"
              >
                <FaLinkedin className="text-xl" />
              </a>
              <a 
                href="https://github.com/your-username" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-gray-900 transition-colors duration-300"
              >
                <FaGithub className="text-xl" />
              </a>
            </div>
            
            {/* Bio */}
            <p className="text-lg sm:text-xl text-white max-w-md">
              I like building intelligent, cross-platform software that accelerates workflows, and enhances everyday efficiency.
            </p>
            
            {/* Location Display */}
            <div className={`flex items-center space-x-3 backdrop-blur-sm border rounded-full px-6 py-3 w-fit transition-all duration-300 ${
              isDarkMode 
                ? 'bg-white/10 border-white/20 hover:bg-white/20' 
                : 'bg-black/10 border-black/20 hover:bg-black/20'
            }`}>
              <FaMapMarkerAlt className={`text-lg transition-colors duration-300 ${
                isDarkMode ? 'text-white/80' : 'text-gray-700'
              }`} />
              <span className={`font-medium tracking-wide transition-colors duration-300 ${
                isDarkMode ? 'text-white' : 'text-gray-800'
              }`}>
                Manchester, UK
              </span>
            </div>
          </div>
          
          {/* Right Section - Avatar */}
          <div className="relative flex justify-center lg:justify-end mr-28">
            {/* Moon/Sun Icon */}
            <div className="absolute -top-4 -right-4 cursor-pointer hover:scale-110 transition-transform duration-300">
              <img 
                src={isDarkMode ? moon : sunny} 
                alt={isDarkMode ? "Moon" : "Sun"}
                className="w-8 h-8"
                onClick={onToggleDarkMode}
              />
            </div>
            
            {/* Avatar Container */}
            <div className="relative">
              <div className="w-80 h-80 rounded-full overflow-hidden border-4 border-gray-700 shadow-2xl">
                <img 
                  src={avatar} 
                  alt="Angel Salinas" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Flag Icon */}
              <div 
                className="absolute -bottom-2 -right-2 cursor-pointer hover:scale-110 transition-transform duration-300"
              >
                <img 
                  src={mexico} 
                  alt="Mexico Flag"
                  className="w-8 h-8"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
