import React, { useEffect, useState } from 'react';
import { fetchExperiences } from '../services/api';

function Experience() {
  const [experiences, setExperiences] = useState([]);
  const [filteredExperiences, setFilteredExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("Work");

  useEffect(() => {
    const getExperiences = async () => {
      try{
        const data = await fetchExperiences();
        setExperiences(data);
        setFilteredExperiences(data.Filter((exp) => exp.type === "Work"));
      }catch (error){
        console.error("Error fetching experiences: ", error);
      }finally {
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
    <div className="experiences-section">
      <div className="filter-section">
        <button
          className={filter === "Work" ? "active-filter" : ""}
          onClick={() => setFilter("Work")}
        >
          Work
        </button>
        <button
          className={filter === "Studies" ? "active-filter" : ""}
          onClick={() => setFilter("Studies")}
        >
          Studies
        </button>
      </div>
      <div className="experiences-grid">
        {filteredExperiences.length > 0 ? (
          filteredExperiences.map((experience) => (
            <div key={experience.id} className="experience-card">
              <img
                src={experience.imageUrl}
                alt={experience.name}
                className="experience-image"
              />
              <h3>{experience.name}</h3>
              <p>{experience.date}</p>
              <p>
                <strong>Role:</strong> {experience.role}
              </p>
              <p>{experience.description}</p>
            </div>
          ))
        ) : (
          <p>No experiences available for {filter}.</p> // Fallback message
        )}
      </div>
    </div>
  );
}

export default Experience;