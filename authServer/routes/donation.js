import express from 'express'; 
import transporter from '../config/mailer.js'

const router = express.Router()

async function sendDonationReciept(donationDetails) {
    try {
        const mailOptions= {
            from: process.env.SENDER_EMAIL, 
            to: donationDetails.donorEmail,
            subject:'Test Email', 
            //subject: `Donation Reciept - ${process.env.ORGANIZATION_NAME}`,
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

function generateTransactionId() {
    return `DON-${Date.now()}-${Math.random().toString(36).substr(2,9)}`; 
}

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
          <td>${donationDetails.transactionId}</td>
        </tr>
      </table>
      <p>Thank you for your support!</p>
    </div>
    `
}

router.post('/donate', async (req, res) => {
    console.log("donation triggered", req.body);

    try {
        const amount = parseFloat(req.body.amount); 

        if (isNaN(amount)) {
            return res.status(400).json({
                message: 'Invalid donation amount', 
                success: false
            });
        }

        const paymentResult = {
            transactionId: generateTransactionId()
        }
        
        await sendDonationReciept({
            donorName: req.body.name,
            donorEmail: req.body.email,
            amount: amount,
            transactionId: paymentResult.transactionId
        });

        res.status(200).json({ 
            message: 'Donation processed successfully', 
            transactionId: paymentResult.transactionId
        });
    } catch (error) {
        console.error('Donation processing error:', error); 
        res.status(500).json({
            message: 'Donation processing failed', 
            error: error.message
        });
    }
})

export default router;