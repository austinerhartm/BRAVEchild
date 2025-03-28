jest.mock('../api.service', () => ({
  get: jest.fn().mockImplementation(() => Promise.resolve({ data: {} })),
  post: jest.fn().mockImplementation(() => Promise.resolve({ data: {} }))
}));

import api from '../api.service';
import AuthService from '../auth.service';

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    
    sessionStorage.clear();
    localStorage.clear();
  });

  describe('Token Management', () => {
    test('setTokens should store tokens in correct storage locations', () => {
      const accessToken = 'access token';
      const refreshToken = 'refresh token';
      
      AuthService.setTokens(accessToken, refreshToken);
      
      expect(sessionStorage.setItem).toHaveBeenCalledWith('accessToken', accessToken);
      expect(localStorage.setItem).toHaveBeenCalledWith('refreshToken', refreshToken);
    });

    test('getAccessToken should retrieve from sessionStorage', () => {
      sessionStorage.getItem.mockReturnValueOnce('access token');
      
      const token = AuthService.getAccessToken();
      
      expect(sessionStorage.getItem).toHaveBeenCalledWith('accessToken');
      expect(token).toBe('access token');
    });

    test('getAccessToken should return null if no token exists', () => {
      sessionStorage.getItem.mockReturnValueOnce(null);
      
      const token = AuthService.getAccessToken();
      
      expect(sessionStorage.getItem).toHaveBeenCalledWith('accessToken');
      expect(token).toBeNull();
    });

    test('getRefreshToken should retrieve from localStorage', () => {
      localStorage.getItem.mockReturnValueOnce('refresh token');
      
      const token = AuthService.getRefreshToken();
      
      expect(localStorage.getItem).toHaveBeenCalledWith('refreshToken');
      expect(token).toBe('refresh token');
    });

    test('getRefreshToken should return null if no token exists', () => {
      localStorage.getItem.mockReturnValueOnce(null);
      
      const token = AuthService.getRefreshToken();
      
      expect(localStorage.getItem).toHaveBeenCalledWith('refreshToken');
      expect(token).toBeNull();
    });

    test('clearTokens should remove tokens from storage', () => {
      AuthService.clearTokens();
      
      expect(sessionStorage.removeItem).toHaveBeenCalledWith('accessToken');
      expect(sessionStorage.removeItem).toHaveBeenCalledWith('refreshToken');
    });
  });

  describe('Authentication Status', () => {
    test('isAuthenticated should return true when access token exists', () => {
      sessionStorage.getItem.mockReturnValueOnce('access token');
      
      const result = AuthService.isAuthenticated();
      
      expect(sessionStorage.getItem).toHaveBeenCalledWith('accessToken');
      expect(result).toBe(true);
    });
    
    test('isAuthenticated should return false when access token does not exist', () => {
      sessionStorage.getItem.mockReturnValueOnce(null);
      
      const result = AuthService.isAuthenticated();
      
      expect(sessionStorage.getItem).toHaveBeenCalledWith('accessToken');
      expect(result).toBe(false);
    });
  });

  describe('User Role', () => {
    test('getUserRole should fetch and return the user role from API', async () => {
      const mockRole = 'user';
      api.get.mockResolvedValueOnce({ data: { role: mockRole } });
      
      const result = await AuthService.getUserRole();
      
      expect(api.get).toHaveBeenCalledWith('/fetch/verify-role');
      expect(result).toBe(mockRole);
    });
    
    test('getUserRole should return null when API call fails', async () => {
      api.get.mockRejectedValueOnce(new Error('API error'));
      
      const result = await AuthService.getUserRole();
      
      expect(api.get).toHaveBeenCalledWith('/fetch/verify-role');
      expect(result).toBeNull();
    });
  });

  describe('Logout', () => {
    test('logout should call the logout API and clear tokens', async () => {
      const refreshToken = 'refresh token';
      localStorage.getItem.mockReturnValueOnce(refreshToken);
      api.post.mockResolvedValueOnce({ data: { success: true } });
      
      const result = await AuthService.logout();
      
      expect(api.post).toHaveBeenCalledWith('/auth/logout', { refreshToken });
      expect(sessionStorage.removeItem).toHaveBeenCalledWith('accessToken');
      expect(sessionStorage.removeItem).toHaveBeenCalledWith('refreshToken');
      expect(result.data.success).toBe(true);
    });
    
    test('logout should clear tokens even when API call fails', async () => {
      const refreshToken = 'refresh token';
      localStorage.getItem.mockReturnValueOnce(refreshToken);
      api.post.mockRejectedValueOnce(new Error('API error'));
      
      const result = await AuthService.logout();
      
      expect(api.post).toHaveBeenCalledWith('/auth/logout', { refreshToken });
      expect(sessionStorage.removeItem).toHaveBeenCalledWith('accessToken');
      expect(sessionStorage.removeItem).toHaveBeenCalledWith('refreshToken');
      expect(result).toBeNull();
    });
  });
});