import React, { useEffect, useState } from 'react';
import { fetchExperiences } from '../services/api';

function Experience() {
    const [experiences, setExperiences] = useState([]);

    useEffect(() => {
        fetchExperiences().then(data => setExperiences(data));
    }, []);

    return(
        <div>
            <h2>Experience</h2>
            {experiences.map((exp) => (
                <div key={exp.id}>
                    <h3>{exp.name}</h3>
                    <p>{exp.date}</p>
                    <p>{exp.role}</p>
                    <p>{exp.description}</p>
                </div>
            ))}
        </div>
    );
}

export default Experience;