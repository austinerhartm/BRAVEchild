import axios from 'axios';
import AuthService from './auth.service';

// Create axios instance with HTTPS configuration
const api = axios.create({
    baseURL: 'https://localhost:8081',  // Updated to match your secure server
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true
});

// Request interceptor
api.interceptors.request.use(
    config => {
        const token = AuthService.getAccessToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

// Response interceptor
api.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && error.response.data.shouldRefresh && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const refreshToken = AuthService.getRefreshToken();
                const response = await api.post('/auth/refresh', { refreshToken });

                AuthService.setTokens(response.data.accessToken, response.data.refreshToken);
                originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;

                return api(originalRequest);
            } catch (refreshError) {
                AuthService.clearTokens();
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        return Promise.reject(error);
    }
);

export default api;