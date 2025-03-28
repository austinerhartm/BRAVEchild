import api from './api.service';
import AuthService from './auth.service';

export const submit_sponsor = async (sponsorData) => {
    try {
        const userId = AuthService.isAuthenticated() ? 
            (sponsorData.user_id || null) : null;

        const donorData = {
            user_id: userId,
            amount: sponsorData.amount,
        };

        const response = await api.post('/sponsor/donate', donorData);
        return response.data;
    } catch (error) {
        console.error('Error in submit_sponsor:', error);
        if (error.response) {
            throw new Error(error.response.data.message || 'Failed to submit donation');
        } else if (error.request) {
            throw new Error('No response received from server');
        } else {
            throw new Error('Error setting up the request');
        }
    }
};