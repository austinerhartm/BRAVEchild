import api from './api.service';

class AuthService {
    static setTokens(accessToken, refreshToken) {
        sessionStorage.setItem('accessToken', accessToken);
        sessionStorage.setItem('refreshToken', refreshToken);
    }

    static getAccessToken() {
        return sessionStorage.getItem('accessToken');
    }

    static getRefreshToken() {
        return sessionStorage.getItem('refreshToken');
    }

    static clearTokens() {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
    }

    static isAuthenticated() {
        return !!this.getAccessToken();
    }

    static async getUserRole() {
        try {
            const response = await api.get('/fetch/verify-role');
            return response.data.role;
        } catch (error) {
            console.error('Error fetching user role:', error);
            return null;
        }
    }
}

export default AuthService;