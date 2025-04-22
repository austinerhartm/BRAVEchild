// send_batch_emails.js
import api from './api.service';

export const send_batch_emails = async (emailRequests) => {
    try {
        const response = await api.post('/email/batch', { emails: emailRequests });
        
        if (response.data.success) {
            return { 
                success: true, 
                data: response.data 
            };
        }
        
        return { 
            success: false, 
            message: response.data.message || 'Failed to send batch emails' 
        };
    } catch (error) {
        console.error('Error in send_batch_emails:', error);
        
        if (error.response) {
            return {
                success: false,
                message: error.response.data.message || 'Failed to send batch emails',
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