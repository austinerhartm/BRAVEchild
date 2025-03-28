import api from './api.service';
import AuthService from './auth.service';

export const register_user = async (credentials) => {
    try {
        const response = await api.post('/auth/registration', credentials);

        if (response.data?.accessToken && response.data?.refreshToken) {
            AuthService.setTokens( response.data.accessToken, response.data.refreshToken );
        }

        return {
            success: true,
            message: response.data.message
        };

    } catch (error) {
        console.error('Registration error:', error);

        if (error.response) {
            const errorMessage = error.response.data?.message || 'Registration failed';
            throw new Error(errorMessage);
        } else if (error.request) {
            throw new Error('No response from server');
        } else {
            throw new Error('Error setting up request');
        }
    }
};