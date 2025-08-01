import { supabase } from '../config/supabase';

export const fetchExperiences = async () => {
    try {
        const { data, error } = await supabase
            .from('experiences')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Error fetching experiences: ", error);
            return [];
        }

        // Map the data to match component expectations
        return (data || []).map(exp => ({
            id: exp.id,
            name: exp.name,
            role: exp.role,
            date: exp.date,
            description: exp.description,
            type: exp.type,
            imageUrl: exp.image_url,
            darkImageUrl: exp.dark_image_url,
            createdAt: exp.created_at
        }));
    } catch (error) {
        console.error("Error fetching experiences: ", error);
        return [];
    }
};

export const fetchProjects = async () => {
    try {
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Error fetching projects: ", error);
            return [];
        }

        // Map the data to match component expectations
        return (data || []).map(project => ({
            id: project.id,
            name: project.name,
            organization: project.organization,
            description: project.description,
            imageUrl: project.image_url,
            repositoryUrl: project.repository_url,
            techStack: project.tech_stack, // This is already JSONB, should work as is
            createdAt: project.created_at
        }));
    } catch (error) {
        console.error("Error fetching projects: ", error);
        return [];
    }
};

export const fetchTechStack = async () => {
    try {
        const { data, error } = await supabase
            .from('tech_stack')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error("Error fetching tech stack: ", error);
            return [];
        }

        // Map the data to match component expectations
        return (data || []).map(tech => ({
            id: tech.id,
            name: tech.name,
            icon: tech.icon_url, // Map icon_url to icon for component compatibility
            type: tech.type,
            createdAt: tech.created_at
        }));
    } catch (error) {
        console.error("Error fetching tech stack: ", error);
        return [];
    }
};