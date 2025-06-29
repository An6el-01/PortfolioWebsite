import React, { useEffect, useState, useCallback, useMemo } from 'react';
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

    const handleProjectClick = useCallback((projectId) => {
        const project = projects.find(p => p.id === projectId);
        if (project && project.repositoryUrl) {
            window.open(project.repositoryUrl, '_blank', 'noopener,noreferrer');
        }
    }, [projects]);

    const handleImageError = useCallback((e) => {
        e.target.style.display = 'none';
    }, []);

    const handleImageLoad = useCallback((e) => {
        e.target.style.opacity = '1';
    }, []);

    if (loading){
        return <p>Loading Projects...</p>
    }

    return(
        <section className="projects-section compact-section" id="projects">
            <h2>Projects</h2>
            <div className="projects-grid">
                {projects.length > 0 ? (
                    projects.map((project) => (
                    <div key={project.id} className="project-card" onClick={() => handleProjectClick(project.id)}>
                        <img 
                            src={project.imageUrl} 
                            alt={project.name} 
                            className="project-image"
                            onError={handleImageError}
                            onLoad={handleImageLoad}
                            style={{ opacity: 0, transition: 'opacity 0.3s ease' }}
                        />
                        <h3>{project.name}</h3>
                        <p>{project.description}</p>
                        <div>
                            <p><strong>Tech Stack:</strong></p>
                            <div className="tech-stack-container">
                                {project.techStack && project.techStack.length > 0 ? (
                                    project.techStack.map((techImage, index) => (
                                        <img 
                                            key={`${project.id}-tech-${index}`}
                                            src={techImage} 
                                            alt={`Tech ${index + 1}`} 
                                            className="tech-stack-image"
                                            onError={handleImageError}
                                            loading="lazy"
                                        />
                                    ))
                                ) : (
                                    <p>No tech stack available</p>
                                )}
                            </div>
                        </div>
                    </div>
                )) 
                ): (
                    <p>No projects available.</p>
                )}
      </div>
    </section>
    );
}

export default Projects;