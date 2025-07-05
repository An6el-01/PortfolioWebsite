import React, { useEffect, useState } from 'react';
import { fetchExperiences } from '../services/api';
import '../styles/Experience.css';

function Experience() {
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

  useEffect(() => {
    const filtered = experiences.filter((exp) => exp.type === filter);
    setFilteredExperiences(filtered);
  }, [filter, experiences]);

  if (loading) {
    return <div>Loading Experiences...</div>;
  }

  return (
    <section className="experience-section floating-bg" id="experience">
      <div className="experience-header-bar">
        <h1 className="experience-header">Experience</h1>
        <div className="experience-toggle">
          <button
            className={filter === 'Work' ? 'active' : ''}
            onClick={() => setFilter('Work')}
            aria-label="Work Experience"
          >
            Work Experience
          </button>
          <button
            className={filter === 'Studies' ? 'active' : ''}
            onClick={() => setFilter('Studies')}
            aria-label="Education"
          >
            Education
          </button>
        </div>
      </div>

      <div className="experience-timeline-container">
        <div className="experience-timeline">
          {filteredExperiences.map((experience, index) => (
            <div key={experience.id} className="experience-timeline-item">
              <div className="experience-timeline-icon">
                <img 
                  src={experience.imageUrl} 
                  alt={experience.name}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
              <div className="experience-timeline-content">
                <div className="experience-timeline-title-row">
                  <h3 className="experience-timeline-title" title={experience.name}>{experience.name}</h3>
                </div>
                <div className="experience-timeline-role-row">
                  <span className="experience-timeline-role">{experience.role}</span>
                </div>
                <p className="experience-timeline-description">{experience.description}</p>
              </div>
              <div className="experience-timeline-date-outer-row">
                <span className="experience-timeline-date-pill">{experience.date}</span>
              </div>
              {index < filteredExperiences.length - 1 && (
                <div className="experience-timeline-connector"></div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Experience;
