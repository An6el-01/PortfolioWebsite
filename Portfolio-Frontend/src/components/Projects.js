import React, { useEffect, useState, useCallback } from 'react';
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

    if (loading){
        return <p>Loading Projects...</p>
    }

    return(
        <section className="projects-section floating-bg" id="projects">
            <div className="projects-header-bar">
                <h1 className="projects-header">Projects</h1>
            </div>
            <div className="projects-row-container">
                <div className="projects-row">
                    {projects.length > 0 ? (
                        projects.map((project) => (
                            <div
                                key={project.id}
                                className="project-row-card"
                                onClick={() => handleProjectClick(project.id)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        handleProjectClick(project.id);
                                    }
                                }}
                                tabIndex={0}
                                role="button"
                                aria-label={`View project: ${project.name}`}
                            >
                                <img
                                    src={project.imageUrl}
                                    alt={`Screenshot of ${project.name} project`}
                                    className="project-row-card-image"
                                    onError={handleImageError}
                                    loading="lazy"
                                />
                                <div className="project-row-card-overlay">
                                    <h3>{project.name}</h3>
                                    <p>{project.description}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No projects available.</p>
                    )}
                </div>
            </div>
        </section>
    );
}

export default Projects;