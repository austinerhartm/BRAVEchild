import api from './api.service';

export const fetch_donos = async (startDate, endDate) => {
    try {
        const response = await api.get(`/fetch/donations?startDate=${startDate}&endDate=${endDate}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching donation data:', error);
        if (error.response) {
            throw new Error(error.response.data.message || 'Failed to fetch donations');
        } else if (error.request) {
            throw new Error('No response received from server');
        } else {
            throw new Error('Error setting up the request');
        }
    }
};