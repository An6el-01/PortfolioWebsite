import React, { useEffect, useState, useCallback } from 'react';
import { fetchProjects } from '../services/api';
import { BsGrid3X3Gap, BsListUl } from 'react-icons/bs';
import '../styles/Portfolio.css';

function Projects() {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [layout, setLayout] = useState('cards'); // 'cards' or 'list'
    const [hoveredIdx, setHoveredIdx] = useState(null);

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

    // Zig-zag staggered card style
    const getCardStyle = (idx) => {
        const isLeft = idx % 2 === 0;
        const baseRotate = isLeft ? -5 : 5;
        const baseAlign = isLeft ? 'flex-start' : 'flex-end';
        const baseMarginTop = idx === 0 ? 0 : 60 * idx; // 60px lower per card
        return {
            alignSelf: baseAlign,
            marginTop: `${baseMarginTop}px`,
            zIndex: hoveredIdx === idx ? projects.length + 1 : projects.length - idx,
            transform: hoveredIdx === idx
                ? 'rotate(0deg) scale(1.04)'
                : `rotate(${baseRotate}deg) scale(1)`
        };
    };

    if (loading){
        return <p>Loading Projects...</p>
    }

    return(
        <section className="projects-section floating-bg" id="projects">
            <div className="projects-header-bar">
                <h1 className="projects-header">Projects</h1>
                <div className="projects-toggle">
                    <button
                        className={layout === 'cards' ? 'active' : ''}
                        onClick={() => setLayout('cards')}
                        aria-label="Card View"
                    >
                        <BsGrid3X3Gap /> Cards
                    </button>
                    <button
                        className={layout === 'list' ? 'active' : ''}
                        onClick={() => setLayout('list')}
                        aria-label="List View"
                    >
                        <BsListUl /> List
                    </button>
                </div>
            </div>
            {layout === 'cards' ? (
                <div className="uclab-zigzag-cards">
                    {projects.length > 0 ? (
                        projects.map((project, idx) => (
                            <div
                                key={project.id}
                                className="uclab-zigzag-card"
                                style={getCardStyle(idx)}
                                onClick={() => handleProjectClick(project.id)}
                                onMouseEnter={() => setHoveredIdx(idx)}
                                onMouseLeave={() => setHoveredIdx(null)}
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
                                    className="uclab-zigzag-card-image"
                                    onError={handleImageError}
                                    loading="lazy"
                                />
                                <div className="poker-card-overlay">
                                    <h3>{project.name}</h3>
                                    <p>{project.description}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No projects available.</p>
                    )}
                </div>
            ) : (
                <div className="projects-list-view">
                    {projects.length > 0 ? (
                        projects.map((project) => (
                            <div key={project.id} className="project-list-row" onClick={() => handleProjectClick(project.id)}>
                                <div className="project-list-img-wrap">
                                    <img 
                                        src={project.imageUrl} 
                                        alt={`Screenshot of ${project.name} project`} 
                                        className="project-list-image"
                                        onError={handleImageError}
                                        loading="lazy"
                                    />
                                </div>
                                <div className="project-list-info">
                                    <div className="project-list-header">
                                        <h3 className="project-list-title">{project.name}</h3>
                                        <p className="project-list-description">{project.description}</p>
                                    </div>
                                    <div className="project-list-tech">
                                        <span className="project-list-tech-label">Technologies</span>
                                        <div className="project-list-tech-icons">
                                            {project.techStack && project.techStack.length > 0 ? (
                                                project.techStack.map((techImage, index) => (
                                                    <img 
                                                        key={`${project.id}-tech-list-${index}`}
                                                        src={techImage} 
                                                        alt={`Tech ${index + 1}`} 
                                                        className="project-list-tech-image"
                                                        onError={handleImageError}
                                                        loading="lazy"
                                                    />
                                                ))
                                            ) : (
                                                <span style={{ color: '#888', fontStyle: 'italic' }}>No tech stack available</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No projects available.</p>
                    )}
                </div>
            )}
        </section>
    );
}

export default Projects;