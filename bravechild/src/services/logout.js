import api from './api.service';
import AuthService from './auth.service';

export const logoutUser = async () => {
    try {
        const refreshToken = AuthService.getRefreshToken();
        await api.post('/auth/logout', { refreshToken });
        AuthService.clearTokens();
        return { success: true };
    } catch (error) {
        return {
            success: false,
            message: error.response?.data?.message || 'Logout failed'
        };
    }
};