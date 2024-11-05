import React, { useEffect, useState } from 'react';
import { fetchProjects } from '../services/api';

function Projects() {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        fetchProjects().then(data => setProjects(data));
    }, []);

    return(
        <div>
            <h2>Projects</h2>
            {projects.map((project) => (
                <div key={project.id}>
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                    <img src={project.imageUrl} alt={project.name}/>
                    <a href={project.repositoryUrl}>Repository</a> {/*Github Icon??? */}
                    <p>Tech Stack: {project.techStack}</p>
                </div>
            ))}
        </div>
    );
}

export default Projects;