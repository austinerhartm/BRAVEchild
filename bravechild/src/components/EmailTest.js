import React, { useState } from 'react';
import api, { handleApiError } from '../services/api.service';

function EmailTest() {   
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    amount: ''
  });

  const [status, setStatus] = useState({
    loading: false,
    response: null,
    error: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, response: null, error: null });
    
    try {
      // Using the api service with the correct endpoint
      const response = await api.post('/donation/donate', formData);
      
      console.log('API Response:', response.data);
      setStatus({
        loading: false,
        response: response.data,
        error: null
      });
    } catch (error) {
      const errorMessage = handleApiError(error, 'Failed to send donation email');
      console.error('Submission error:', error);
      
      setStatus({
        loading: false,
        response: null,
        error: errorMessage
      });
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Email Receipt Test</h2>
      
      {status.error && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#ffeeee', 
          color: '#d32f2f',
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          Error: {status.error}
        </div>
      )}
      
      {status.response && (
        <div style={{ 
          padding: '10px', 
          backgroundColor: '#eeffee', 
          color: '#2e7d32',
          borderRadius: '4px',
          marginBottom: '20px'
        }}>
          <h3>Success!</h3>
          <pre style={{ whiteSpace: 'pre-wrap' }}>
            {JSON.stringify(status.response, null, 2)}
          </pre>
        </div>
      )}
      
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Name:
          </label>
          <input 
            type="text" 
            name="name" 
            value={formData.name}
            onChange={handleChange}
            required 
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Email:
          </label>
          <input 
            type="email" 
            name="email" 
            value={formData.email}
            onChange={handleChange}
            required 
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px' }}>
            Amount:
          </label>
          <input 
            type="number" 
            name="amount" 
            value={formData.amount}
            onChange={handleChange}
            required 
            min="1"
            step="0.01"
            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={status.loading}
          style={{
            padding: '10px 15px',
            backgroundColor: status.loading ? '#cccccc' : '#1976d2',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: status.loading ? 'not-allowed' : 'pointer',
            marginTop: '10px'
          }}
        >
          {status.loading ? 'Sending...' : 'Send Test Email'}
        </button>
      </form>
    </div>
  );
}  

export default EmailTest;
