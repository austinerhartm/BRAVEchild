import api from './api.service';

class AuthService {
    static setTokens(accessToken, refreshToken) {
        sessionStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
    }

    static getAccessToken() {
        return sessionStorage.getItem('accessToken');
    }

    static getRefreshToken() {
        return localStorage.getItem('refreshToken');
    }

    static clearTokens() {
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
    }

    static isAuthenticated() {
        return Boolean(this.getAccessToken());
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

    static async logout() {
        try {
            const refreshToken = this.getRefreshToken();
            const response = await api.post('/auth/logout', { refreshToken });
            this.clearTokens();
            return response;
        } catch (error) {
            console.error('Error logging out:', error);
            this.clearTokens();
            return null;
        }
    }
}

export default AuthService;