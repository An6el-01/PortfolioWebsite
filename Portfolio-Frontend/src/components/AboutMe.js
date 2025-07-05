import React, { useEffect, useState } from 'react';
import '../styles/AboutMe.css';
import '../styles/TechStackCarousel.css';
import MockUpMe from '../assets/MockUpMe.jpg';
import { fetchTechStack } from '../services/api';

const AboutMe = () => {
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
    <section className="aboutme-split" id="about">
      <div className="aboutme-split-left">
        <h1 className="aboutme-split-headline">Hi I'm Angel. Let me tell you a little bit about myself.</h1>
        <p className="aboutme-split-desc">
        I'm a software developer based in Manchester, UK, who enjoys solving real world problems through 
        thoughtful, purpose driven software. I've worked across a variety of scenarios, developing 
        cross-platform applications. In everything I build, I focus on creating clean, 
        efficient user interfaces that are accessible and intuitive for all types of users.
        </p>
        <div className="aboutme-split-lists">
          <div className="aboutme-split-list-col">
            <div className="aboutme-split-list-header">
              <div className="aboutme-split-list-title">Tech Stack:</div>
              {!loading && (
                <div className="aboutme-filter-container">
                  <select
                    value={selectedFilter}
                    onChange={(e) => setSelectedFilter(e.target.value)}
                    className="aboutme-filter-select"
                  >
                    {filterOptions.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              )}
            </div>
            {loading ? (
              <p>Loading Tech Stack...</p>
            ) : (
              <div className="aboutme-techstack-carousel-wrapper">
                <div 
                  className="aboutme-techstack-carousel css-infinite-scroll"
                  style={{ animationDuration: getAnimationDuration() }}
                >
                  {carouselItems.map((tech, idx) => (
                    <div key={tech.id + '-skillset-' + idx} className="aboutme-techstack-carousel-card glass-card">
                      <img
                        src={tech.icon}
                        alt={tech.name}
                        className="aboutme-techstack-carousel-icon"
                      />
                      <p className="aboutme-techstack-carousel-name">{tech.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="aboutme-split-right">
        <img
          src={MockUpMe}
          alt="Angel Salinas workspace"
          className="aboutme-split-image"
        />
      </div>
    </section>
  );
};

export default AboutMe;
