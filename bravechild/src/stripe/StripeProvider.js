import React from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const STRIPE_PUBLISH_KEY = process.env.REACT_APP_STRIPE_PUBLISH_KEY;

const stripePromise = STRIPE_PUBLISH_KEY 
  ? loadStripe(STRIPE_PUBLISH_KEY) 
  : Promise.reject(new Error('Stripe publish key not found in environment variables'));

console.log(`Stripe initialization ${STRIPE_PUBLISH_KEY ? 'started' : 'failed - missing publish key'}`);

export const StripeProvider = ({ children }) => {
  if (!STRIPE_PUBLISH_KEY) {
    return (
      <div style={{ 
        padding: '20px', 
        margin: '20px 0', 
        backgroundColor: '#fff9c4', 
        border: '1px solid #fbc02d',
        borderRadius: '4px'
      }}>
        <h3 style={{ color: '#bf360c', margin: '0 0 10px 0' }}>Payment System Configuration Issue</h3>
        <p>The payment system is not properly configured. Please contact the administrator.</p>
      </div>
    );
  }
  
  return (
    <Elements stripe={stripePromise}>
      {children}
    </Elements>
  ); 
};

export default StripeProvider;