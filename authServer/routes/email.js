import 'dotenv/config';
import db from '../config/db.js';
import transporter from '../config/mailer.js'
import express from 'express';
const router = express.Router();

import { authenticateToken } from '../middleware/token_auth.js';
import { require_role } from '../middleware/require_role.js';


router.post('/send-parent-link', authenticateToken, require_role('super_admin'), async (req, res) => {
    try {
        const { email, subject, content, childName, donationLink } = req.body;
        
        if (!email || !content || !childName || !donationLink) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields'
            });
        }

        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: subject || `Fundraising Link for ${childName}`,
            text: content,
            html: content.replace(/\n/g, '<br>')
        };

        const info = await transporter.sendMail(mailOptions);

        await db.query(
            `INSERT INTO email_logs (recipient, child_name, subject, content, status, message_id) 
             VALUES (?, ?, ?, ?, ?, ?)`,
            [email, childName, subject, content, 'Sent', info.messageId]
        );

        res.json({
            success: true,
            message: 'Email sent successfully',
            data: {
                messageId: info.messageId
            }
        });
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send email',
            error: error.message
        });
    }
});

router.get('/history', authenticateToken, require_role('super_admin'), async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        
        let query = `SELECT * FROM email_logs`;
        const params = [];
        
        if (startDate && endDate) {
            query += ` WHERE created_at BETWEEN ? AND ?`;
            params.push(startDate, endDate);
        } else if (startDate) {
            query += ` WHERE created_at >= ?`;
            params.push(startDate);
        } else if (endDate) {
            query += ` WHERE created_at <= ?`;
            params.push(endDate);
        }
        
        query += ` ORDER BY created_at DESC`;
        
        const [rows] = await db.query(query, params);
        
        res.json({
            success: true,
            data: {
                emails: rows
            }
        });
    } catch (error) {
        console.error('Error fetching email history:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch email history',
            error: error.message
        });
    }
});

router.post('/batch', async (req, res) => {
    try {
        const { emails } = req.body;
        
        if (!emails || !Array.isArray(emails) || emails.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No emails to send'
            });
        }

        const results = [];
        let successCount = 0;
        let failCount = 0;

        // Process each email request
        for (const emailData of emails) {
            const { email, subject, content, childName, donationLink } = emailData;
            
            if (!email || !content || !childName) {
                results.push({
                    email: email || 'unknown',
                    success: false,
                    message: 'Missing required fields'
                });
                failCount++;
                continue;
            }

            try {
                // Send email using nodemailer
                const mailOptions = {
                    from: `"BRAVE Child" <${process.env.EMAIL_USER}>`,
                    to: email,
                    subject: subject || `Fundraising Link for ${childName}`,
                    text: content,
                    html: content.replace(/\n/g, '<br>') // Simple HTML conversion of line breaks
                };

                const info = await transporter.sendMail(mailOptions);

                // Log email in database
                await db.query(
                    `INSERT INTO email_logs (recipient, child_name, subject, content, status, message_id) 
                     VALUES (?, ?, ?, ?, ?, ?)`,
                    [email, childName, subject, content, 'Sent', info.messageId]
                );

                results.push({
                    email,
                    success: true,
                    messageId: info.messageId
                });
                successCount++;
            } catch (error) {
                console.error(`Error sending email to ${email}:`, error);
                results.push({
                    email,
                    success: false,
                    message: error.message
                });
                failCount++;
            }
        }

        res.json({
            success: true,
            message: `Successfully sent ${successCount} emails, failed ${failCount} emails`,
            data: {
                results,
                successCount,
                failCount
            }
        });
    } catch (error) {
        console.error('Error sending batch emails:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to send batch emails',
            error: error.message
        });
    }
});

export default router;