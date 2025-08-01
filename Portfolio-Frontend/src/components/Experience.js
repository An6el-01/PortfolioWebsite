import React, { useEffect, useState } from 'react';
import { fetchExperiences } from '../services/api';

function Experience({ isDarkMode }) {
  const [experiences, setExperiences] = useState([]);
  const [filteredExperiences, setFilteredExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Work');

  useEffect(() => {
    const getExperiences = async () => {
      try {
        const data = await fetchExperiences();
        setExperiences(data);
        setFilteredExperiences(data.filter((exp) => exp.type === 'Work'));
      } catch (error) {
        console.error('Error fetching experiences: ', error);
      } finally {
        setLoading(false);
      }
    };
    getExperiences();
  }, []);

  // Function to extract year from date string
  const extractYear = (dateString) => {
    const yearMatch = dateString.match(/\b(20\d{2})\b/);
    return yearMatch ? parseInt(yearMatch[1]) : 0;
  };

  // Function to sort experiences chronologically (oldest to newest)
  const sortExperiencesChronologically = (expList) => {
    return [...expList].sort((a, b) => {
      const yearA = extractYear(a.date || '');
      const yearB = extractYear(b.date || '');
      return yearA - yearB;
    });
  };

  useEffect(() => {
    const filtered = experiences.filter((exp) => exp.type === filter);
    const sortedFiltered = sortExperiencesChronologically(filtered);
    setFilteredExperiences(sortedFiltered);
  }, [filter, experiences]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center transition-colors duration-300">
        <div className="text-center">
          <div className={`w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4 transition-colors duration-300 ${
            isDarkMode ? 'border-purple-500' : 'border-blue-500'
          }`}></div>
          <p className={`text-lg transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Loading Experiences...
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className={`min-h-screen py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300`} id="experience">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className={`text-5xl lg:text-6xl font-bold mb-6 transition-colors duration-300 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Experience
          </h1>
          <p className={`text-xl max-w-2xl mx-auto transition-colors duration-300 ${
            isDarkMode ? 'text-gray-300' : 'text-gray-600'
          }`}>
            My professional journey and educational background
          </p>
        </div>
        
        {/* Filter Toggle */}
        <div className="flex justify-center mb-16">
          <div className={`inline-flex rounded-2xl p-2 transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gray-800/60 border border-gray-700/50 shadow-xl shadow-black/20' 
              : 'bg-gray-100 border border-gray-200 shadow-xl shadow-gray-200/50'
          } backdrop-blur-sm`}>
            <button
              className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                filter === 'Work'
                  ? isDarkMode
                    ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/25'
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25'
                  : isDarkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }`}
              onClick={() => setFilter('Work')}
              aria-label="Work Experience"
            >
              Work Experience
            </button>
            <button
              className={`px-8 py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${
                filter === 'Studies'
                  ? isDarkMode
                    ? 'bg-gradient-to-r from-purple-600 to-purple-700 text-white shadow-lg shadow-purple-500/25'
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25'
                  : isDarkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700/50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
              }`}
              onClick={() => setFilter('Studies')}
              aria-label="Education"
            >
              Education
            </button>
          </div>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Background Timeline Line */}
          <div className={`absolute top-1/2 left-0 right-0 h-1 transform -translate-y-1/2 transition-all duration-300 ${
            isDarkMode 
              ? 'bg-gradient-to-r from-purple-500/20 via-purple-400/10 to-purple-500/20' 
              : 'bg-gradient-to-r from-blue-500/20 via-blue-400/10 to-blue-500/20'
          }`}></div>
          
          {/* Experience Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 relative z-10 mt-8">
            {filteredExperiences.map((experience, index) => (
              <div 
                key={experience.id} 
                className="group relative flex flex-col items-center"
              >
                {/* Icon Container */}
                <div className={`relative w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-all duration-500 ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-gray-800 to-gray-900 border-4 border-purple-500/30 shadow-2xl shadow-purple-500/20' 
                    : 'bg-gradient-to-br from-white to-gray-50 border-4 border-blue-500/30 shadow-2xl shadow-blue-500/20'
                } group-hover:border-purple-500/60 group-hover:shadow-2xl group-hover:shadow-purple-500/30 transform group-hover:scale-110`}>
                  
                  {/* Glow Effect */}
                  <div className={`absolute inset-0 rounded-full transition-all duration-500 blur-xl group-hover:blur-2xl`}></div>
                  
                  <img 
                    src={!isDarkMode && experience.darkImageUrl ? experience.darkImageUrl : experience.imageUrl} 
                    alt={experience.name}
                    className="relative z-10 w-12 h-12 object-contain filter drop-shadow-lg transition-all duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
                
                {/* Content Card */}
                <div className={`w-full rounded-2xl p-6 text-center transform transition-all duration-500 ${
                  isDarkMode 
                    ? 'bg-gradient-to-br from-gray-800/90 to-gray-900/95 border border-purple-400/20 shadow-2xl shadow-purple-500/10' 
                    : 'bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-2xl shadow-blue-500/10'
                } group-hover:border-purple-500/40 group-hover:shadow-2xl group-hover:shadow-purple-500/20 group-hover:-translate-y-2 min-h-[220px] flex flex-col justify-between backdrop-blur-sm`}>
                  
                  {/* Title */}
                  <div className="mb-4">
                    <h3 
                      className={`font-bold text-xl mb-2 line-clamp-2 transition-colors duration-300 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                      }`}
                      title={experience.name}
                    >
                      {experience.name}
                    </h3>
                  </div>
                  
                  {/* Role */}
                  <div className="mb-4">
                    <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-400/30' 
                        : 'bg-blue-500/20 text-blue-700 border border-blue-400/30'
                    } backdrop-blur-sm`}>
                      {experience.role}
                    </span>
                  </div>
                  
                  {/* Description */}
                  <p className={`text-sm leading-relaxed mb-6 flex-1 transition-colors duration-300 ${
                    isDarkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    {experience.description}
                  </p>
                  
                  {/* Date */}
                  <div className="flex justify-center">
                    <span className={`inline-block px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                      isDarkMode 
                        ? 'bg-gray-800/80 text-white border border-gray-600/50 shadow-lg shadow-black/20' 
                        : 'bg-gray-100 text-gray-700 border border-gray-300 shadow-lg shadow-gray-200/50'
                    } backdrop-blur-sm`}>
                      {experience.date}
                    </span>
                  </div>
                </div>
                
                {/* Connector Line (for desktop) */}
                {index < filteredExperiences.length - 1 && (
                  <div className={`hidden lg:block absolute top-10 -right-4 w-8 h-0.5 transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-gradient-to-r from-purple-500/60 to-purple-500/20' 
                      : 'bg-gradient-to-r from-blue-500/60 to-blue-500/20'
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Experience;
