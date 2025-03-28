import express from 'express';
import Stripe from 'stripe';
import { authenticateToken } from '../middleware/token_auth.js';
import 'dotenv/config';
import db from '../config/db.js';
import transporter from '../config/mailer.js'

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//sets the mailoptions for nodemailer and sends 
async function sendDonationReciept(donationDetails) {
  try {
      const mailOptions= {
          from: process.env.SENDER_EMAIL, 
          to: donationDetails.donorEmail,
          subject: 'Donation Reciept - BRAVE Child',
          html: generateRecieptHTML(donationDetails)
      }; 

      const info = await transporter.sendMail(mailOptions);
      console.log('Receipt email sent:', info.messageId);
      return info;
  } catch (error) {
      console.error('Email sending error:', error); 
      throw error; 
  }
}

//define here what html to be displayed in the email 
function generateRecieptHTML(donationDetails) {
  return  `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <h1>Thank You for Your Donation</h1>
    <p>Dear ${donationDetails.donorName},</p>
    <table>
      <tr>
        <td><strong>Amount:</strong></td>
        <td>$${donationDetails.amount.toFixed(2)}</td>
      </tr>
      <tr>
        <td><strong>Date:</strong></td>
        <td>${new Date().toLocaleString()}</td>
      </tr>
      <tr>
        <td><strong>Transaction ID:</strong></td>
        <td>${donationDetails.paymentId}</td>
      </tr>
    </table>
    <p>Thank you for your support!</p>
  </div>
  `
}

//helper trigger function to start reciept behavior 
async function triggerReceipt(req, res) {
  try {
      const amount = parseFloat(req.body.amount); 

      if (isNaN(amount)) {
          return res.status(400).json({
              message: 'Invalid donation amount', 
              success: false
          });
      }

      const paymentResult = {
          paymentId: req.body.paymentId
      }
      
      await sendDonationReciept({
          donorName: req.body.name,
          donorEmail: req.body.email,
          amount: amount,
          paymentId: paymentResult.paymentId
      });

      res.status(200).json({ 
          message: 'Donation processed successfully', 
          paymentId: paymentResult.paymentId
      });
  } catch (error) {
      console.error('Donation processing error:', error); 
      res.status(500).json({
          message: 'Donation processing failed', 
          error: error.message
      });
  }
}

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
    
    // trigger reciept send and check for success 
    const recieptResult = await triggerReceipt(req, res); 
    if (!recieptResult.success) {
      console.warn('Reciept sending failed but will continue with donation save:', recieptResult.error)
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