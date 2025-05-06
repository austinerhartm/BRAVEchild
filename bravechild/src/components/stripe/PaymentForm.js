import React, { useState, useEffect } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Box, Button, CircularProgress, Alert, Typography } from '@mui/material';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

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
      setError("Stripe is not initialized. Reload page");
      return;
    }

    setProcessing(true);

    const token = sessionStorage.getItem('accessToken');
    if (!token) {
      setError("Authentication token not found. Please log in again");
      setProcessing(false);
      console.log("Access Token: ", token);
      return;
      
    }

    try {
      //paymentIntent Stripe API call but for backend
      const response = await fetch(`${API_BASE_URL}/payment/create-payment-intent`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ 
          amount: amount * 100,
          metadata: {
            name: formData?.firstName && formData?.lastName ?
              `${formData.firstName} ${formData.lastName}` : 'Anon',
            email: formData?.email || '',
          }
        }),
      });
      
      const data = await response.json();
      
      if (!data.clientSecret) {
        throw new Error('Failed to create payment intent');
      }

      const cardElement = elements.getElement(CardElement);
      if(!cardElement) {
        throw new Error('Failed to get card element');
      }

      const result = await stripe.confirmCardPayment(data.clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: formData?.firstName && formData?.lastName ? 
              `${formData.firstName} ${formData.lastName}` : 'Anon',
            email: formData?.email || '',
            address: {
              line1: formData?.address || formData?.billingAddress || '',
            }
          },
        }
      });

      if (result.error) {
        setError(result.error.message);
      } else if (result.paymentIntent.status === 'succeeded') {
        onSuccess(result.paymentIntent.id);
      }
    } catch (err) {
      setError(err.message);
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
        disabled={!stripe || processing}
        startIcon={processing && <CircularProgress size={20} />}
      >
        {processing ? 'Processing...' : `Pay $${amount}`}
      </Button>
    </Box>
  );
};

export default PaymentForm;