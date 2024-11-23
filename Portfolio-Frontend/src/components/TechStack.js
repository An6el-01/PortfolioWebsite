import React, { useEffect, useState } from 'react';
import { fetchTechStack } from '../services/api';

function TechStack () {
    const [techStacks, setTechStacks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedType, setSelectedType] = useState('');

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

    const uniqueTypes = [...new Set(techStacks.map((stack) => stack.type))];

    const filteredStacks = selectedType 
    ? techStacks.filter((stack) =>  stack.type === selectedType) 
    : techStacks;

    if (loading){
        return <p>Loading TechStack...</p>
    }
    return (
        <div>
            <h2>Tech Stack</h2>

            {/* Filter Dropdown */}
            <div className="filter-section">
                <label htmlFor="typeFilter">Filter by Type:</label>
                <select
                    id="typeFilter"
                    value={selectedType}
                    onChange={(e) => setSelectedType(e.target.value)}
                >
                    <option value="">All</option>
                    {uniqueTypes.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>

            {/* Display Tech Stacks */}
            <ul className="techstack-grid">
                {filteredStacks.map((tech) => (
                    <li key={tech.id} className="techstack-item">
                        <img
                            src={tech.icon}
                            alt={tech.name}
                            className="techstack-icon"
                        />
                        <p>{tech.name}</p>
                        <span className="techstack-type">{tech.type}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TechStack