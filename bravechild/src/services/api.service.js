import axios from 'axios';
import AuthService from './auth.service';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001';

console.log(`API Service initializing with base URL: ${API_BASE_URL}`);

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    },
    withCredentials: true,
    timeout: 10000
});

api.interceptors.request.use(
    config => {
        const token = AuthService.getAccessToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        
        if (process.env.NODE_ENV !== 'production') {
            console.log(`API Request: ${config.method.toUpperCase()} ${config.url}`, config);
        }
        
        return config;
    },
    error => {
        console.error('API Request Error:', error);
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    response => {
        if (process.env.NODE_ENV !== 'production') {
            console.log(`API Response: ${response.status} - ${response.config.url}`, response.data);
        }
        return response;
    },
    async error => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 && 
            error.response.data.shouldRefresh && 
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                const refreshToken = AuthService.getRefreshToken();
                if (!refreshToken) {
                    throw new Error('No refresh token available');
                }
                
                console.log('Attempting to refresh token...');
                const response = await api.post('/auth/refresh', { refreshToken });

                if (response.data?.accessToken) {
                    AuthService.setTokens(response.data.accessToken, response.data.refreshToken);
                    api.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
                    originalRequest.headers['Authorization'] = `Bearer ${response.data.accessToken}`;
                    
                    console.log('Token refreshed successfully');
                    return api(originalRequest);
                } else {
                    throw new Error('Invalid refresh response');
                }
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                AuthService.clearTokens();
                
                if (window.location.pathname.includes('/login') || 
                    window.location.pathname.includes('/dashboard')) {
                    window.location.href = '/login';
                }
                
                return Promise.reject(refreshError);
            }
        }

        console.error('API Response Error:', {
            url: originalRequest?.url,
            status: error.response?.status,
            data: error.response?.data,
            message: error.message
        });

        return Promise.reject(error);
    }
);

export const handleApiError = (error, defaultMessage = 'An error occurred') => {
    if (error.response) {
        return error.response.data?.message || 
               `Server error: ${error.response.status} ${error.response.statusText}` || 
               defaultMessage;
    } else if (error.request) {
        console.error('No response received:', error.request);
        return 'No response received from server. Please check your internet connection.';
    } else {
        console.error('Request setup error:', error.message);
        return error.message || 'Error setting up the request';
    }
};

export const testApiConnection = async () => {
    try {
        const response = await api.get('/status');
        return {
            success: true,
            status: response.status,
            data: response.data
        };
    } catch (error) {
        return {
            success: false,
            error: handleApiError(error, 'API connection test failed')
        };
    }
};

export default api;