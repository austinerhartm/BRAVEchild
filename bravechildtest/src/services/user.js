import api from './api.service';

export const fetch_user = async () => {
    try {
        const response = await api.get('/fetch/user');
        
        return response.data;
    } catch (error) {
        console.error('Error in fetch_user:', error);
        if (error.response) {
            throw new Error(error.response.data.message || 'Failed to fetch user data');
        } else if (error.request) {
            throw new Error('No response received from server');
        } else {
            throw new Error('Error setting up the request');
        }
    }
};
