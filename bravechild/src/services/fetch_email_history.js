import api from './api.service';

export const fetch_email_history = async (startDate, endDate) => {
    try {
        // Set default date range if not provided
        const queryParams = new URLSearchParams();
        
        if (startDate) {
            queryParams.append('startDate', startDate.toISOString().split('T')[0]);
        }
        
        if (endDate) {
            queryParams.append('endDate', endDate.toISOString().split('T')[0]);
        }
        
        const url = `/email/history${queryParams.toString() ? '?' + queryParams.toString() : ''}`;
        const response = await api.get(url);
        
        if (response.data.success) {
            return { 
                success: true, 
                data: response.data 
            };
        }
        
        return { 
            success: false, 
            message: response.data.message || 'Failed to fetch email history' 
        };
    } catch (error) {
        console.error('Error in fetch_email_history:', error);
        
        if (error.response) {
            return {
                success: false,
                message: error.response.data.message || 'Failed to fetch email history',
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