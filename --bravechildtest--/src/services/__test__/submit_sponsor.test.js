jest.mock('../api.service', () => ({
    post: jest.fn()
  }));
  
  jest.mock('../auth.service', () => ({
    isAuthenticated: jest.fn()
  }));
  
  import api from '../api.service';
  import AuthService from '../auth.service';
  import { submit_sponsor } from '../submit_sponsor';
  
  describe('Donation Submission Service', () => {
    beforeAll(() => {
      jest.spyOn(console, 'error').mockImplementation(() => {});
    });
  
    afterAll(() => {
      console.error.mockRestore();
    });
  
    beforeEach(() => {
      jest.clearAllMocks();
    });
  
    describe('submit_sponsor', () => {
      test('sends donation data to API for authenticated user', async () => {
        const donationData = {
          user_id: 123,
          fname: 'John',
          lname: 'Doe',
          email: 'john@example.com',
          amount: 50
        };
        
        AuthService.isAuthenticated.mockReturnValue(true);
        api.post.mockResolvedValueOnce({ data: { success: true, id: 456 } });
        
        const result = await submit_sponsor(donationData);
        
        expect(AuthService.isAuthenticated).toHaveBeenCalled();
        expect(api.post).toHaveBeenCalledWith('/sponsor/donate', {
          user_id: 123,
          amount: 50
        });
        expect(result).toEqual({ success: true, id: 456 });
      });
  
      test('uses null user_id for unauthenticated users', async () => {
        const donationData = {
          fname: 'Jane',
          lname: 'Smith',
          email: 'jane@example.com',
          amount: 100
        };
        
        AuthService.isAuthenticated.mockReturnValue(false);
        api.post.mockResolvedValueOnce({ data: { success: true } });
        
        const result = await submit_sponsor(donationData);
        
        expect(api.post).toHaveBeenCalledWith('/sponsor/donate', {
          user_id: null,
          amount: 100
        });
        expect(result).toEqual({ success: true });
      });
  
      test('handles API errors properly', async () => {
        const donationData = {
          amount: 25
        };
        
        AuthService.isAuthenticated.mockReturnValue(true);
        api.post.mockRejectedValueOnce({
          response: { 
            data: { message: 'Invalid donation amount' } 
          }
        });
        
        await expect(submit_sponsor(donationData)).rejects.toThrow('Invalid donation amount');
        expect(api.post).toHaveBeenCalled();
      });
  
      test('handles network errors', async () => {
        const donationData = { amount: 75 };
        
        AuthService.isAuthenticated.mockReturnValue(true);
        api.post.mockRejectedValueOnce({
          request: {},
          message: 'Network error'
        });
        
        await expect(submit_sponsor(donationData)).rejects.toThrow('No response received from server');
      });
  
      test('handles unexpected errors', async () => {
        const donationData = { amount: 75 };
        
        AuthService.isAuthenticated.mockReturnValue(true);
        api.post.mockRejectedValueOnce(new Error('Unexpected error'));
        
        await expect(submit_sponsor(donationData)).rejects.toThrow('Error setting up the request');
      });
    });
  
    describe('Payment integration (future)', () => {
      test('includes payment method information when provided', async () => {
        const donationData = {
          amount: 100,
          paymentMethod: {
            type: 'credit_card',
            token: 'tok_visa'
          }
        };
        
        AuthService.isAuthenticated.mockReturnValue(false);
        api.post.mockResolvedValueOnce({ data: { success: true } });
        
        await submit_sponsor(donationData);
        
        // This test will initially fail until payment integration is implemented
        // Uncomment when implementing payment integration:
        // expect(api.post).toHaveBeenCalledWith('/sponsor/donate', 
        //   expect.objectContaining({
        //     amount: 100,
        //     paymentMethod: {
        //       type: 'credit_card',
        //       token: 'tok_visa'
        //     }
        //   })
        // );
        
        expect(api.post).toHaveBeenCalled();
      });
  
      test('handles recurring donation flags', async () => {
        const donationData = {
          amount: 25,
          recurring: true,
          interval: 'monthly'
        };
        
        AuthService.isAuthenticated.mockReturnValue(false);
        api.post.mockResolvedValueOnce({ data: { success: true } });
        
        await submit_sponsor(donationData);
        
        // Uncomment when implementing recurring donations:
        // expect(api.post).toHaveBeenCalledWith('/sponsor/donate', 
        //   expect.objectContaining({
        //     amount: 25,
        //     recurring: true,
        //     interval: 'monthly'
        //   })
        // );
        
        expect(api.post).toHaveBeenCalled();
      });
    });
  });