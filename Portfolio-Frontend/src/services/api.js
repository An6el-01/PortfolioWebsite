import axios from 'axios';

const API_URL = 'API URL';

export const fetchExperiences = async () => {
    const response = await axios.get(`${API_URL}/experience`);
    return response.data;
};

export const fetchProjects = async () => {
    const response = await axios.get(`${API_URL}/project`);
    return response.data;
}

export const fetchTechStack = async () => {
    const response = await axios.get(`${API_URL}/tech-stack`);
    return response.data;
}