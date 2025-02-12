import api from './api.service';

export const get_dono_amount = async () => {
    try {
<<<<<<< Updated upstream
        const response = await fetch(`${API_BASE_URL}/fetch/progress`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch progress data');
        }

        return response.json();
=======
        const response = await api.get('/fetch/progress');
        return response.data;
>>>>>>> Stashed changes
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