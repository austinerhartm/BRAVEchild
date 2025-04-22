import express from 'express';
import Stripe from 'stripe';
import { authenticateToken } from '../middleware/token_auth.js';
import 'dotenv/config';
import db from '../config/db.js';
import transporter from '../config/mailer.js'
import { generateDonationReceipt, savePdfToFileSystem } from '../utilities/pdfGenerator.js';  

const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//sets the mailoptions for nodemailer and sends 
async function sendDonationRecieptWithPdf(donationDetails, pdfBuffer, filename) {
  try {
      const mailOptions= {
          from: process.env.SENDER_EMAIL, 
          to: donationDetails.donorEmail,
          subject: 'Donation Reciept - BRAVE Child',
          html: generateRecieptHTML(donationDetails),
          attachments: [
            {
              filename: filename, 
              content: pdfBuffer, 
              contentType: 'application/pdf'
            }
          ] 
      }; 

      const info = await transporter.sendMail(mailOptions);
      console.log('Receipt email with pdf sent:', info.messageId);
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
    
    const donationDetails = {
      donorName: name || 'Anonymous',
      donorEmail: email, 
      amount: amount, 
      transactionId: paymentId, 
      date: new Date(),
      paymentMethod: 'Credit Card'
    };

    // Generate and save the reciept 
    const { buffer, filename } = await generateDonationReceipt(donationDetails);
    const filePath = await savePdfToFileSystem(buffer, filename);

    const [result] = await db.execute(
      'INSERT INTO donations (user_id, amount, payment_id, donator_name, donator_email, receipt_path, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())',
      [userId, amount, paymentId, name || 'Anonymous', email || null, filePath]
    );

    await sendDonationRecieptWithPdf(donationDetails, buffer, filename);

    await db.execute(
      'UPDATE donations SET receipt_sent = TRUE WHERE payment_id = ?',
      [paymentId]
    );

    res.status(200).json({
      success: true,
      message: 'Donation saved successfully and reciept sent',
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