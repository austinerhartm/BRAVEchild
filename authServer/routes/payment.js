import express from 'express';
import Stripe from 'stripe';
import { authenticateToken } from '../middleware/token_auth.js';
import 'dotenv/config';
import db from '../config/db.js';

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post('/create-payment-intent', authenticateToken, async (req, res) => {
    console.log('Received payment intent request: ', req.body);
  try {
    const { amount, metadata } = req.body;
    
    //Stripe paymentIntent API stuff
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    res.status(200).json({ 
      clientSecret: paymentIntent.client_secret 
    });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ 
      success: false, 
      message: error.message 
    });
  }
});

 //updates the database with the donation information
router.post('/save-donation', authenticateToken, async (req, res) => {
  console.log('Received donation save request:', req.body);
  try {
    const userId = req.user.id;
    console.log('User ID:', userId);
    const { name, email, amount, paymentId } = req.body;
    
    if (!amount || !paymentId) {
      return res.status(400).json({ 
        success: false, 
        message: 'Donation amount and payment ID are required' 
      });
    }


   
    const [result] = await db.execute(
      'INSERT INTO donations (user_id, amount, payment_id, donator_name, donator_email, created_at) VALUES (?, ?, ?, ?, ?, NOW())',
      [userId, amount, paymentId, name || 'Anonymous', email || null]
    );

    res.status(200).json({
      success: true,
      message: 'Donation saved successfully',
      donationId: result.insertId
    });
  } catch (error) {
    console.error('Error saving donation:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to save donation information' 
    });
  }
});

export default router;