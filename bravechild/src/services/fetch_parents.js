// fetch_parents.js
import api from './api.service';

export const fetch_parents = async () => {
    try {
        const response = await api.get('/parents');
        
        if (response.data.success) {
            return { 
                success: true, 
                data: response.data 
            };
        }
        
        return { 
            success: false, 
            message: response.data.message || 'Failed to fetch parents' 
        };
    } catch (error) {
        console.error('Error in fetch_parents:', error);
        
        if (error.response) {
            return {
                success: false,
                message: error.response.data.message || 'Failed to fetch parents',
                error: error.response.data
            };
        } else if (error.request) {
            return {
                success: false,
                message: 'No response received from server',
                error: 'Network error'
            };
        } else {
            return {
                success: false,
                message: 'Error setting up the request',
                error: error.message
            };
        }
    }
};