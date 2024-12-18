import React, { useEffect, useState } from 'react';
import { fetchExperiences } from '../services/api';
import '../styles/Experience.css'; // New CSS file for styling

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
    <section className="experience-container">
      {/* Toggle Buttons */}
      <div className="toggle-section">
        <button
          className={filter === 'Work' ? 'active' : ''}
          onClick={() => setFilter('Work')}
        >
          Work
        </button>
        <button
          className={filter === 'Studies' ? 'active' : ''}
          onClick={() => setFilter('Studies')}
        >
          Education
        </button>
      </div>

      {/* Timeline */}
      <div className="timeline-container">
        {filteredExperiences.map((experience, index) => (
          <div key={experience.id} className="timeline-item">
            <div className="timeline-icon">
              <img src={experience.imageUrl} alt={experience.name} />
            </div>
            <div className="timeline-content">
              <p className="timeline-date">{experience.date}</p>
              <h3 className="timeline-title">{experience.name}</h3>
              <p className="timeline-role">{experience.role}</p>
              <p className="timeline-description">{experience.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Experience;
