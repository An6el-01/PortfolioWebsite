import React, { useEffect, useState } from 'react';
import Me from '../assets/me.jpg';
import BirthdayLight from '../assets/birthday-light.png';
import BirthdayDark from '../assets/birthday-dark.png';
import { fetchTechStack } from '../services/api';

const AboutMe = ({ isDarkMode }) => {
  const [techStacks, setTechStacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    const getTechStack = async () => {
      try {
        const data = await fetchTechStack();
        setTechStacks(data);
      } catch (error) {
        console.error("Error fetching tech stacks: ", error);
      } finally {
        setLoading(false);
      }
    };
    getTechStack();
  }, []);

  // Define the three filter categories
  const filterOptions = [
    { value: 'all', label: 'All Technologies' },
    { value: 'languages', label: 'Languages' },
    { value: 'storage', label: 'Storage' }
  ];

  // Categorize tech stacks based on their type
  const categorizeTechStack = (tech) => {
    const type = tech.type.toLowerCase();
    
    // Languages category
    if (type.includes('language') || type.includes('programming') || 
        type.includes('frontend') || type.includes('backend') ||
        type.includes('javascript') || type.includes('python') ||
        type.includes('java') || type.includes('c#') || type.includes('c++') ||
        type.includes('php') || type.includes('ruby') || type.includes('go') ||
        type.includes('rust') || type.includes('swift') || type.includes('kotlin') ||
        type.includes('typescript') || type.includes('html') || type.includes('css')) {
      return 'languages';
    }
    
    // Database category
    if (type.includes('database') || type.includes('db') || type.includes('storage') ||
        type.includes('sql') || type.includes('nosql') || type.includes('mongodb') ||
        type.includes('postgresql') || type.includes('mysql') || type.includes('redis') ||
        type.includes('firebase') || type.includes('aws') || type.includes('azure') ||
        type.includes('cloud') || type.includes('data')) {
      return 'storage';
    }
    
    // Default to languages for anything else
    return 'languages';
  };

  // Filter tech stacks based on selected filter
  const getFilteredTechStacks = () => {
    if (selectedFilter === 'all') {
      return techStacks;
    }
    return techStacks.filter(tech => categorizeTechStack(tech) === selectedFilter);
  };

  // Calculate animation duration based on number of items for consistent speed
  const getAnimationDuration = () => {
    const filteredItems = getFilteredTechStacks();
    const baseDuration = 20; // Base duration in seconds
    const baseItemCount = 6; // Base number of items for reference
    
    // Adjust duration based on item count to maintain consistent visual speed
    const itemCount = filteredItems.length;
    const adjustedDuration = Math.max(baseDuration, (itemCount / baseItemCount) * baseDuration);
    
    return `${adjustedDuration}s`;
  };

  // Duplicate the filtered array for seamless infinite scroll
  const carouselItems = getFilteredTechStacks().concat(getFilteredTechStacks());

  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
      <div className="max-w-6xl w-full flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Left Section - Image */}
        <div className="w-full lg:w-1/2">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={Me}
              alt="Angel Salinas in Colorado, USA"
              className="w-full h-[500px] lg:h-[600px] object-cover"
            />
            {/* Enhanced Photo caption overlay */}
            <div className="absolute bottom-4 left-4">
              <div className={`${isDarkMode ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-md rounded-full px-5 py-3 shadow-lg border ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
                <div className="flex items-center justify-center gap-2">
                  <svg className={`w-4 h-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`} fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-800'}`}>
                    Photo of me in Colorado, USA
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Content Panel */}
        <div className="w-full lg:w-1/2">
          <div className={`${isDarkMode 
            ? 'bg-blue-900/90 text-blue-200' 
            : 'bg-white/95 text-gray-800 border border-gray-200/50'
          } backdrop-blur-sm rounded-2xl p-8 lg:p-10 h-full shadow-xl`}>
            {/* Name */}
            <h1 className={`text-4xl lg:text-5xl font-bold mb-4 ${
              isDarkMode ? 'text-blue-300' : 'text-gray-900'
            }`}>
              Angel Salinas
            </h1>

            {/* Birthdate/Age */}
            <div className="flex items-center gap-2 mb-6">
              <img 
                src={isDarkMode ? BirthdayDark : BirthdayLight} 
                alt="Birthday icon" 
                className={`w-5 h-5 ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}
              />
              <span className={`text-lg ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                19-Sept-2001 - 23
              </span>
            </div>

            {/* Bio */}
            <div className="mb-8">
              <p className={`leading-relaxed mb-4 ${
                isDarkMode ? 'text-blue-200' : 'text-gray-700'
              }`}>
                I'm a Manchester-based software developer dedicated to creating reliable software that solves real world problems. I prioritize building clean, efficient, and intuitive user interfaces that ensure accessibility for all. I'm skilled in the entire development lifecycle, including frontend, backend architecture, and cloud deployment.
              </p>
            </div>

            {/* Tech Stack Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-semibold ${
                  isDarkMode ? 'text-blue-300' : 'text-gray-900'
                }`}>
                  Tech Stack:
                </h3>
                {!loading && (
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className={`border rounded-lg px-3 py-1 text-sm focus:outline-none focus:ring-2 transition-all duration-200 ${
                      isDarkMode 
                        ? 'bg-blue-800/60 border-blue-400/30 text-blue-200 focus:ring-blue-400' 
                        : 'bg-white/80 border-gray-300 text-gray-700 focus:ring-blue-500'
                    }`}
                  >
                    {filterOptions.map(option => (
                      <option 
                        key={option.value} 
                        value={option.value} 
                        className={isDarkMode ? 'bg-blue-900 text-blue-200' : 'bg-white text-gray-700'}
                      >
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              
              {loading ? (
                <p className={isDarkMode ? 'text-blue-300' : 'text-blue-600'}>
                  Loading Tech Stack...
                </p>
              ) : (
                <div className="w-full overflow-hidden">
                  <div 
                    className="flex gap-3 animate-scroll"
                    style={{ 
                      animationDuration: getAnimationDuration(),
                      width: 'max-content'
                    }}
                  >
                    {carouselItems.map((tech, idx) => (
                      <div 
                        key={tech.id + '-skillset-' + idx} 
                        className={`flex flex-col items-center justify-center min-w-[80px] max-w-[100px] min-h-[90px] max-h-[110px] rounded-xl border p-3 hover:-translate-y-1 hover:scale-105 transition-all duration-200 cursor-pointer group ${
                          isDarkMode 
                            ? 'bg-blue-800/60 border-blue-400/20 hover:border-blue-400/40 hover:shadow-lg hover:shadow-blue-400/20' 
                            : 'bg-white/80 border-gray-200 hover:border-blue-300 hover:shadow-lg hover:shadow-blue-200'
                        }`}
                      >
                        <img
                          src={tech.icon}
                          alt={tech.name}
                          className={`w-6 h-6 mb-2 filter drop-shadow-lg transition-all duration-200 group-hover:scale-110 ${
                            isDarkMode 
                              ? 'drop-shadow-blue-400/30 group-hover:drop-shadow-blue-400/50' 
                              : 'drop-shadow-gray-400/30 group-hover:drop-shadow-blue-400/50'
                          }`}
                        />
                        <p className={`text-xs font-semibold text-center leading-tight ${
                          isDarkMode ? 'text-blue-200' : 'text-gray-700'
                        }`}>
                          {tech.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
