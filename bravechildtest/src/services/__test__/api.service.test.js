jest.mock('axios', () => ({
    create: jest.fn(() => ({
      interceptors: {
        request: { use: jest.fn() },
        response: { use: jest.fn() }
      }
    }))
  }));
  
  describe('API Service', () => {
    test('can be imported without errors', () => {
      const api = require('../api.service');
      expect(api).toBeDefined();
    });
  });