import React, { useEffect, useState, useCallback } from 'react';
import { fetchProjects } from '../services/api';

function Projects({ isDarkMode }) {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedProject, setSelectedProject] = useState(null);

    useEffect(() => {
        const getProjects = async () => {
            try{
                const data = await fetchProjects();
                setProjects(data);
                // Set the first project as selected by default
                if (data.length > 0) {
                    setSelectedProject(data[0]);
                }
            }catch (error){
                console.error("Error fetching projects: ", error)
            }finally{
                setLoading(false);
            }
        };
        getProjects();
    }, []);

    const handleProjectSelect = useCallback((project) => {
        setSelectedProject(project);
    }, []);

    const handleProjectClick = useCallback((project) => {
        if (project && project.repositoryUrl) {
            window.open(project.repositoryUrl, '_blank', 'noopener,noreferrer');
        }
    }, []);

    const handleImageError = useCallback((e) => {
        e.target.style.display = 'none';
    }, []);

    if (loading){
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className={`text-lg ${isDarkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                    Loading Projects...
                </p>
            </div>
        );
    }

    return(
        <section className="min-h-screen py-16 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Header above the flex row */}
                <div className="mb-8">
                    <h1 className={`text-4xl lg:text-5xl font-bold mb-6 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                        Projects
                    </h1>
                </div>
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">
                    {/* Left Panel - Project Selection */}
                    <div className="w-full lg:w-1/2 h-full">
                        <div className="space-y-4 max-h-[600px] h-full overflow-y-auto pr-2" id="projects-list-col">
                            {projects.length > 0 ? (
                                projects.map((project) => (
                                    <div
                                        key={project.id}
                                        className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 border ${
                                            selectedProject?.id === project.id
                                                ? isDarkMode 
                                                    ? 'bg-purple-600/20 border-purple-400 shadow-lg shadow-purple-500/25'
                                                    : 'bg-blue-100 border-blue-400 shadow-lg shadow-blue-500/25'
                                                : isDarkMode
                                                    ? 'bg-gray-800/50 border-gray-700 hover:border-purple-400/50 hover:bg-gray-800/70'
                                                    : 'bg-white/80 border-gray-200 hover:border-blue-400 hover:bg-white/90'
                                        }`}
                                        onClick={() => handleProjectSelect(project)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' || e.key === ' ') {
                                                e.preventDefault();
                                                handleProjectSelect(project);
                                            }
                                        }}
                                        tabIndex={0}
                                        role="button"
                                        aria-label={`Select project: ${project.name}`}
                                    >
                                        <img
                                            src={project.imageUrl}
                                            alt={`Screenshot of ${project.name} project`}
                                            className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                                            onError={handleImageError}
                                            loading="lazy"
                                        />
                                        <div className="flex-1 min-w-0 ">
                                            <h3 className={`font-semibold text-lg mb-1 ${
                                                isDarkMode ? 'text-white' : 'text-gray-900'
                                            }`}>
                                                {project.name}
                                            </h3>

                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className={`text-center py-8 ${
                                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}>
                                    No projects available.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Right Panel - Selected Project Display */}
                    <div className="w-full lg:w-1/2 h-full flex">
                        {selectedProject ? (
                            <div className={`relative rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between w-full h-full min-h-[600px] ${
                                isDarkMode ? 'bg-gray-900/90' : 'bg-white/95'
                            } backdrop-blur-sm border ${
                                isDarkMode ? 'border-gray-700' : 'border-gray-200'
                            }`} style={{minHeight: '100%'}}>
                                {/* Background Image and Overlay */}
                                <div className="absolute inset-0 w-full h-full z-0">
                                    <img
                                        src={selectedProject.imageUrl}
                                        alt="Project background"
                                        className="w-full h-full object-cover object-center"
                                        style={{filter: 'brightness(0.35)'}}
                                    />
                                    <div className="absolute inset-0 bg-black/60" />
                                </div>
                                {/* Tech Stack Icons - Bottom Left */}
                                <div className="absolute bottom-4 left-4 z-20 flex gap-2 flex-wrap">
                                    {(() => {
                                        let techStackArray = null;
                                        if (selectedProject.techStack) {
                                            if (typeof selectedProject.techStack === 'string') {
                                                try {
                                                    techStackArray = JSON.parse(selectedProject.techStack);
                                                } catch {
                                                    techStackArray = selectedProject.techStack.split(',').map(t => t.trim());
                                                }
                                            } else if (Array.isArray(selectedProject.techStack)) {
                                                techStackArray = selectedProject.techStack;
                                            }
                                        }
                                        return techStackArray && techStackArray.length > 0 ? techStackArray.map((tech, index) => (
                                            <img
                                                key={index}
                                                src={tech}
                                                alt={`Tech stack ${index + 1}`}
                                                className="w-6 h-6 object-contain rounded bg-white/90 p-0.5 shadow-md hover:scale-110 transition-transform duration-200"
                                                onError={handleImageError}
                                                loading="lazy"
                                            />
                                        )) : null;
                                    })()}
                                </div>
                                {/* Project Content */}
                                <div className="relative z-10 p-6 lg:p-8 flex-1 flex flex-col justify-between">
                                    {/* Header */}
                                    <div className="mb-6">
                                        <h2 className="text-2xl lg:text-3xl font-bold mb-2 text-white">
                                            {selectedProject.name}
                                        </h2>
                                        <p className="text-lg text-gray-200">
                                            {selectedProject.organization}
                                        </p>
                                    </div>
                                    {/* Description */}
                                    <div className="mb-8">
                                        <p className="leading-relaxed text-gray-100">
                                            {selectedProject.description}
                                        </p>
                                    </div>
                                    {/* GitHub Button - Bottom Right */}
                                    <div className="flex items-end justify-end mt-auto">
                                        <button 
                                            className={`p-3 rounded-lg transition-all duration-200 hover:scale-105 bg-gray-800/80 hover:bg-gray-700/80 text-white border border-gray-600 hover:border-gray-500`}
                                            onClick={() => handleProjectClick(selectedProject)}
                                            title="View Repository"
                                        >
                                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className={`flex items-center justify-center h-64 rounded-2xl border-2 border-dashed ${
                                isDarkMode ? 'border-gray-600 text-gray-400' : 'border-gray-300 text-gray-500'
                            }`}>
                                <p className="text-lg">Select a project to view details</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Projects;