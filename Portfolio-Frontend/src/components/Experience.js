import React, { useEffect, useState } from 'react';
import { fetchExperiences } from '../services/api';

function Experience() {
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getExperiences =  async () => {
            try{
                const data = await fetchExperiences();
                setExperiences(data);
            }catch (error){
                console.error("Error fetching experiences: ", error)
            }finally {
                setLoading(false);
            }
        };
        getExperiences();
        }, []);

        if (loading){
            return <p>Loading Experiences...</p>;
        }

        return (
            <div className="experiences-section">
              <h2>Experiences</h2>
              <div className="experiences-grid">
                {experiences.length > 0 ? (
                  experiences.map((experience) => (
                    <div key={experience.id} className="experience-card">
                      <img src={experience.imageUrl} alt={experience.name} className="experience-image" />
                      <h3>{experience.name}</h3>
                      <p>{experience.date}</p>
                      <p><strong>Role:</strong> {experience.role}</p>
                      <p>{experience.description}</p>
                      <p><strong>Type:</strong> {experience.type}</p>
                    </div>
                  ))
                ) : (
                  <p>No experiences available.</p> // Fallback message
                )}
              </div>
            </div>
          );
          
}

export default Experience;