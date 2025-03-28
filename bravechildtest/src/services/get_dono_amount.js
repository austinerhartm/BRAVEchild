import api from './api.service';

export const get_dono_amount = async () => {
    try {
        const response = await api.get('/fetch/progress');
        return response.data;
    } catch (error) {
        console.error('Error fetching donation progress:', error);
        if (error.response) {
            throw new Error(error.response.data.message || 'Failed to fetch progress data');
        } else if (error.request) {
            throw new Error('No response received from server');
        } else {
            throw new Error('Error setting up the request');
        }
    }
};