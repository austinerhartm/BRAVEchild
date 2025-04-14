// add_parent.js
import api from './api.service';

export const add_parent = async (parentData) => {
    try {
        const response = await api.post('/parents', parentData);
        
        if (response.data.success) {
            return { 
                success: true, 
                data: response.data 
            };
        }
        
        return { 
            success: false, 
            message: response.data.message || 'Failed to add parent' 
        };
    } catch (error) {
        console.error('Error in add_parent:', error);
        
        if (error.response) {
            return {
                success: false,
                message: error.response.data.message || 'Failed to add parent',
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