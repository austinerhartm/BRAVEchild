import api from './api.service';
import AuthService from './auth.service';

// function takes in credentials from login and turns them into a JSON formated string
// returns both the status response from the auth server and a token if user credentials are valid
export const login_user = async (username, password) => {
    try {
        const response = await api.post('/auth/login', { username, password });

        if (response.data.success) {
            AuthService.setTokens(response.data.accessToken, response.data.refreshToken);
            return { success: true, username: response.data.username };
        }

        return { success: false, message: response.data.message };
    } catch (error) {
        console.error('Login error:', error);
        return {
            success: false,
            message: error.response?.data?.message || 'Login failed'
        };
    }
};