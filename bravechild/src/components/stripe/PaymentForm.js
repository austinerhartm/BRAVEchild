import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Box, Button, CircularProgress, Alert, Typography } from '@mui/material';

const API_BASE_URL = (process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001');

const PaymentForm = ({ amount, onSuccess, formData }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [clientReady, setClientReady] = useState(false);

  useEffect(() => {
    if (stripe && elements) {
      setClientReady(true);
    } else {
      setClientReady(false);
    }
  }, [stripe, elements]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!stripe || !elements) {
      setError("Stripe is not initialized. Please reload the page");
      return;
    }

    if (!amount || amount <= 0) {
      setError("Please enter a valid donation amount");
      return;
    }

    setProcessing(true);
    setError(null);

    try {
      const token = 
        sessionStorage.getItem('accessToken') || 
        localStorage.getItem('accessToken') || 
        localStorage.getItem('token') || 
        '';
      
      const headers = {
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      console.log('Sending payment intent request to:', `${API_BASE_URL}/payment/create-payment-intent`);
      console.log('With data:', { 
        amount: Math.round(amount * 100),
        metadata: {
          name: formData?.firstName && formData?.lastName ?
            `${formData.firstName} ${formData.lastName}` : 'Anonymous',
          email: formData?.email || '',
        }
      });

      let response;
      
      try {
        if (token) {
          response = await fetch(`${API_BASE_URL}/payment/create-payment-intent`, {
            method: 'POST',
            headers: headers,
            credentials: 'include',
            body: JSON.stringify({ 
              amount: Math.round(amount * 100),
              metadata: {
                name: formData?.firstName && formData?.lastName ?
                  `${formData.firstName} ${formData.lastName}` : 'Anonymous',
                email: formData?.email || '',
              }
            }),
          });
        }
        
        if (!token || (response && response.status === 401)) {
          console.log('Trying anonymous payment endpoint...');
          response = await fetch(`${API_BASE_URL}/payment/anonymous-payment-intent`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
              amount: Math.round(amount * 100),
              metadata: {
                name: formData?.firstName && formData?.lastName ?
                  `${formData.firstName} ${formData.lastName}` : 'Anonymous',
                email: formData?.email || '',
              }
            }),
          });
        }
      } catch (fetchError) {
        console.error('Fetch error:', fetchError);
        throw new Error(`Network error: ${fetchError.message}`);
      }
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Payment intent error response:', errorText);
        throw new Error(`Payment server error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Payment intent response:', data);
      
      if (!data.clientSecret) {
        throw new Error('Server did not return a client secret');
      }

      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error('Card element not found');
      }

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: formData?.firstName && formData?.lastName ? 
              `${formData.firstName} ${formData.lastName}` : 'Anonymous',
            email: formData?.email || '',
            address: {
              line1: formData?.address || formData?.billingAddress || '',
            }
          },
        }
      });

      if (result.error) {
        throw new Error(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        console.log('Payment succeeded:', result.paymentIntent.id);
        onSuccess(result.paymentIntent.id);
      } else {
        throw new Error(`Payment status: ${result.paymentIntent.status}`);
      }
    } catch (err) {
      console.error('Payment error:', err);
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (!clientReady) {
    return (
      <Box sx={{ p: 2, textAlign: 'center'}}>
        <CircularProgress size={24} sx={{ mr: 1 }} />
        <Typography>Loading payment form...</Typography>
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Box sx={{ p: 2, border: '1px solid #eee', borderRadius: 1, mb: 2 }}>
        <CardElement options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
          hidePostalCode: true,
        }} />
      </Box>
      
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      <Button
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={!stripe || processing || amount <= 0}
        startIcon={processing ? <CircularProgress size={20} /> : null}
      >
        {processing ? 'Processing...' : `Pay $${parseFloat(amount).toFixed(2)}`}
      </Button>

      <Typography variant="caption" color="textSecondary" sx={{ mt: 2, display: 'block', textAlign: 'center' }}>
        Secure payment processing by Stripe
      </Typography>
    </Box>
  );
};

export default PaymentForm;