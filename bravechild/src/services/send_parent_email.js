import api from './api.service';

export const send_parent_email = async (emailData) => {
    try {
        const response = await api.post('/email/send-parent-link', emailData);
        
        if (response.data.success) {
            return { 
                success: true, 
                message: response.data.message || 'Email sent successfully' 
            };
        }
        
        return { 
            success: false, 
            message: response.data.message || 'Failed to send email' 
        };
    } catch (error) {
        console.error('Error in send_parent_email:', error);
        
        if (error.response) {
            return {
                success: false,
                message: error.response.data.message || 'Failed to send email',
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