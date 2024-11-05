import React, { useEffect, useState } from 'react';
import { fetchTechStack } from '../services/api';

function TechStack () {
    const [techStack, setTechStack] = useState([]);

    useEffect(() => {
        fetchTechStack().then(data => setTechStack(data));
    }, []);
    return(
        <div>
            <h2>Tech Stack</h2>
            <ul>
                {techStack.map((tech) =>(
                    <li key={tech.id}>
                        <img src={tech.icon} alt={tech.name}/>
                        <p>{tech.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TechStack