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
            <div className="min-h-screen flex items-center justify-center transition-colors duration-300">
                <div className="text-center">
                    <div className={`w-16 h-16 border-4 border-t-transparent rounded-full animate-spin mx-auto mb-4 transition-colors duration-300 ${
                        isDarkMode ? 'border-purple-500' : 'border-blue-500'
                    }`}></div>
                    <p className={`text-lg transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                        Loading Projects...
                    </p>
                </div>
            </div>
        );
    }

    return(
        <section className={`min-h-screen py-16 px-4 sm:px-6 lg:px-8 transition-colors duration-300`} id="projects">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <h1 className={`text-5xl lg:text-6xl font-bold mb-6 transition-colors duration-300 ${
                        isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                        Projects
                    </h1>
                    <p className={`text-xl max-w-2xl mx-auto transition-colors duration-300 ${
                        isDarkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}>
                        Explore my latest work and technical achievements
                    </p>
                </div>
                
                {/* Main Content Area */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Panel - Project Selection */}
                    <div className="space-y-6">
                        <h2 className={`text-2xl font-bold mb-6 transition-colors duration-300 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                            Select a Project
                        </h2>
                        <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2" id="projects-list-col">
                            {projects.length > 0 ? (
                                projects.map((project) => (
                                    <div
                                        key={project.id}
                                        className={`group flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 border ${
                                            selectedProject?.id === project.id
                                                ? isDarkMode 
                                                    ? 'bg-gradient-to-r from-purple-600/20 to-purple-500/10 border-purple-400/60 shadow-lg shadow-purple-500/25'
                                                    : 'bg-gradient-to-r from-blue-600/20 to-blue-500/10 border-blue-400/60 shadow-lg shadow-blue-500/25'
                                                : isDarkMode
                                                    ? 'bg-gradient-to-br from-gray-800/60 to-gray-900/80 border-gray-700/50 hover:border-purple-400/50 hover:bg-gray-800/70 hover:shadow-lg hover:shadow-purple-500/10'
                                                    : 'bg-gradient-to-br from-white/90 to-gray-50/95 border-gray-200/80 hover:border-blue-400/50 hover:bg-white/95 hover:shadow-lg hover:shadow-blue-500/10'
                                        } backdrop-blur-sm`}
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
                                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                                            <img
                                                src={project.imageUrl}
                                                alt={`Screenshot of ${project.name} project`}
                                                className="w-full h-full object-cover"
                                                onError={handleImageError}
                                                loading="lazy"
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className={`font-semibold text-lg mb-1 transition-colors duration-300 ${
                                                isDarkMode ? 'text-white' : 'text-gray-900'
                                            }`}>
                                                {project.name}
                                            </h3>
                                            <p className={`text-sm transition-colors duration-300 ${
                                                isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                            }`}>
                                                {project.organization}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className={`text-center py-8 transition-colors duration-300 ${
                                    isDarkMode ? 'text-gray-400' : 'text-gray-600'
                                }`}>
                                    No projects available.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Right Panel - Selected Project Display */}
                    <div className="space-y-6">
                        <h2 className={`text-2xl font-bold mb-6 transition-colors duration-300 ${
                            isDarkMode ? 'text-white' : 'text-gray-900'
                        }`}>
                            Project Details
                        </h2>
                        <div className="flex">
                        {selectedProject ? (
                            <div className={`relative rounded-2xl overflow-hidden shadow-2xl w-full h-[500px] transition-all duration-300 ${
                                isDarkMode 
                                    ? 'bg-gradient-to-br from-gray-900/95 to-gray-800/90 border-gray-700/60 shadow-purple-500/10' 
                                    : 'bg-gradient-to-br from-white/95 to-gray-50/90 border-gray-200/60 shadow-blue-500/10'
                            } backdrop-blur-sm border`}>
                                {/* Background Image and Overlay */}
                                <div className="absolute inset-0 w-full h-full z-0">
                                    <img
                                        src={selectedProject.imageUrl}
                                        alt="Project background"
                                        className="w-full h-full object-cover object-center transition-all duration-300"
                                        style={{
                                            filter: isDarkMode ? 'brightness(0.35)' : 'brightness(0.5)'
                                        }}
                                    />
                                    <div className={`absolute inset-0 transition-all duration-300 ${
                                        isDarkMode ? 'bg-black/60' : 'bg-white/70'
                                    }`} />
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
                                            <div key={index} className={`p-1 rounded-lg transition-all duration-200 hover:scale-110 ${
                                                isDarkMode 
                                                    ? 'bg-gray-800/80 border border-gray-600/50 shadow-lg shadow-purple-500/20' 
                                                    : 'bg-white/90 border border-gray-200/50 shadow-lg shadow-blue-500/20'
                                            }`}>
                                                <img
                                                    src={tech}
                                                    alt={`Tech stack ${index + 1}`}
                                                    className="w-6 h-6 object-contain"
                                                    onError={handleImageError}
                                                    loading="lazy"
                                                />
                                            </div>
                                        )) : null;
                                    })()}
                                </div>
                                
                                {/* Project Content */}
                                <div className="relative z-10 p-6 h-full flex flex-col">
                                    {/* Header */}
                                    <div className="mb-4">
                                        <h2 className={`text-2xl lg:text-3xl font-bold mb-2 transition-colors duration-300 ${
                                            isDarkMode ? 'text-white' : 'text-black'
                                        }`}>
                                            {selectedProject.name}
                                        </h2>
                                        <p className={`text-lg transition-colors duration-300 ${
                                            isDarkMode ? 'text-gray-200' : 'text-gray-900'
                                        }`}>
                                            {selectedProject.organization}
                                        </p>
                                    </div>
                                    
                                    {/* Description */}
                                    <div className="flex-1 overflow-y-auto">
                                        <p className={`leading-relaxed text-sm lg:text-base transition-colors duration-300 ${
                                            isDarkMode ? 'text-gray-100' : 'text-black'
                                        }`}>
                                            {selectedProject.description}
                                        </p>
                                    </div>
                                    
                                    {/* GitHub Button - Bottom Right */}
                                    <div className="flex items-end justify-end mt-4">
                                        <button 
                                            className={`p-3 rounded-lg transition-all duration-200 hover:scale-105 ${
                                                isDarkMode 
                                                    ? 'bg-gray-800/80 hover:bg-gray-700/80 text-white border border-gray-600 hover:border-gray-500 shadow-lg shadow-purple-500/20' 
                                                    : 'bg-gray-700/80 hover:bg-gray-600/80 text-white border border-gray-500 hover:border-gray-400 shadow-lg shadow-blue-500/20'
                                            }`}
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
                            <div className={`flex items-center justify-center h-[500px] rounded-2xl border-2 border-dashed transition-colors duration-300 ${
                                isDarkMode ? 'border-gray-600 text-gray-400' : 'border-gray-300 text-gray-500'
                            }`}>
                                <p className="text-lg">Select a project to view details</p>
                            </div>
                        )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Projects;