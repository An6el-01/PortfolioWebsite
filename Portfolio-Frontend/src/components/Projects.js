import React, { useEffect, useState } from 'react';
import { fetchProjects } from '../services/api';
import '../styles/Portfolio.css';

function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getProjects = async () => {
            try{
                const data = await fetchProjects();
                setProjects(data);
            }catch (error){
                console.error("Error fetching projects: ", error)
            }finally{
                setLoading(false);
            }
        };
        getProjects();
    }, []);

    if (loading){
        return <p>Loading Projects...</p>
    }

    return(
        <div className="projects-section">
            <h2>Projects</h2>
            <div className="projects-grid">
                {projects.length > 0 ? (
                    projects.map((project) => (
                    <div key={project.id} className="project-card">
                        <img src={project.imageUrl} alt={project.name} className="project-image" />
                        <h3>{project.name}</h3>
                        <p>{project.description}</p>
                        <p><strong>Tech Stack:</strong> {project.techStack}</p>
                        <a href={project.repositoryUrl} target="_blank" rel="noopener noreferrer">
                        View Repository
                        </a>
                    </div>
                )) 
                ): (
                    <p>No projects available.</p>
                )}
      </div>
    </div>
    );
}

export default Projects;