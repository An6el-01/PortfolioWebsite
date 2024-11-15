import axios from 'axios';

const API_URL = 'http://localhost:5015/api';

export const fetchExperiences = async () => {
    try{
        const response = await axios.get(`${API_URL}/experience`);
        return response.data;
    }catch (error){
        console.error("Error fetching experiences: ", error)
    }

};

export const fetchProjects = async () => {
    try{
        const response = await axios.get(`${API_URL}/projects`);
        return response.data;
    }catch (error){
        console.error("Error fetching projects: ", error);
    }
  
}

export const fetchTechStack = async () => {
    try{
        const response = await axios.get(`${API_URL}/techstack`);
        return response.data;
    }catch (error) {
        console.error("Error fetching tech stack: ", error);
    }
    
}