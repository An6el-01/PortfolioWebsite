import React, { useEffect, useState } from 'react';
import '../styles/TechStackCarousel.css';
import { fetchTechStack } from '../services/api';

function TechStack () {
    const [techStacks, setTechStacks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getTechStack = async () => {
            try{
                const data =  await fetchTechStack();
                setTechStacks(data);
            }catch (error) {
                console.error("Error fetching tech stacks: ", error)
            }finally{
                setLoading(false);
            }
        };
        getTechStack();
    }, []);

    if (loading){
        return <p>Loading TechStack...</p>
    }
    // Duplicate the array for seamless infinite scroll
    const carouselItems = techStacks.concat(techStacks);
    return (
        <section id="techstack">
            <h2 className="section-title">Tech Stack</h2>
            <div className="techstack-carousel-wrapper">
                <div className="techstack-carousel css-infinite-scroll">
                    {carouselItems.map((tech, idx) => (
                        <div key={tech.id + '-' + idx} className="techstack-carousel-card glass-card">
                            <img
                                src={tech.icon}
                                alt={tech.name}
                                className="techstack-carousel-icon"
                            />
                            <p className="techstack-carousel-name">{tech.name}</p>
                            <span className="techstack-carousel-type">{tech.type}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default TechStack;