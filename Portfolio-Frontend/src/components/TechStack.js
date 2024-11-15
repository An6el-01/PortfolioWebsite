import React, { useEffect, useState } from 'react';
import { fetchTechStack } from '../services/api';

function TechStack () {
    const [techStack, setTechStack] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getTechStack = async () => {
            try{
                const data =  await fetchTechStack();
                setTechStack(data);
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
    return(
        <div>
            <h2>Tech Stack</h2>
            <ul>
                {techStack.length > 0 ? (
                    techStack.map((tech) =>(
                    <li key={tech.id}>
                        <img src={tech.icon} alt={tech.name}/>
                        <p>{tech.name}</p>
                    </li>
                ))
                ):(
                    <p>No tech stacks found</p>
                )}
            </ul>
        </div>
    );
}

export default TechStack