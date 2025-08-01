import React from 'react';

const Footer = ({ isDarkMode }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={`relative z-10 mt-16 transition-all duration-300 ${
      isDarkMode 
        ? 'bg-gradient-to-br from-gray-900/95 to-gray-800/98 border-t border-purple-500/15' 
        : 'bg-gradient-to-br from-gray-50/95 to-white/98 border-t border-blue-500/15'
    } backdrop-blur-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
          {/* Left Section - Name and Title */}
          <div className="flex flex-col items-center sm:items-start gap-1">
            <h3 className={`font-bold text-xl sm:text-2xl transition-colors duration-300 ${
              isDarkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Angel Salinas
            </h3>
            <p className={`font-medium transition-colors duration-300 ${
              isDarkMode ? 'text-purple-400' : 'text-blue-600'
            }`}>
              Software Developer
            </p>
          </div>
          
         
          
          {/* Right Section - Copyright */}
          <div className="flex flex-col items-center sm:items-end gap-2">
            <p className={`text-sm transition-colors duration-300 ${
              isDarkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              © {currentYear} Angel Salinas. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 