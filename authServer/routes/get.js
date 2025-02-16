import express from 'express';
const router = express.Router();

import db from '../config/db.js';
import { authenticateToken } from '../middleware/token_auth.js';
import { require_role } from '../middleware/require_role.js';

// Endpoint to get progress
router.get('/progress', async (req, res) => {
    let [sqlTotal] = await db.execute('SELECT SUM(amount) AS amt FROM donations');
    let progressValue = sqlTotal[0].amt;
    res.json({ progress: progressValue });
});

// Endpoint to fetch tiles
router.get('/tiles/:linkId', async (req, res) => {
    try {
        const { linkId } = req.params;
        if (!linkId) {
            return res.status(403).json({ success: false, message: 'No id found' });
        }

        const [[donee]] = await db.execute('SELECT child_id FROM donation_receivers WHERE link = ?', [linkId]);
        if (!donee) {
            return res.status(403).json({ success: false, message: 'Not valid link' });
        }

        const [blockedTiles] = await db.execute('SELECT selected_tile FROM donation_tile_selections WHERE child_id = ?',  [donee.child_id]);
        
        res.status(200).json({
            success: true,
            tileData: {
                blockedTiles: blockedTiles
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Endpoint to fetch user
router.get('/user', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;

        // Get user data
        const [[user]] = await db.execute( 'SELECT id, username, email FROM users WHERE id = ?', [userId]);

        if (!user) {
            return res.status(403).json({ success: false, message: 'User not found' });
        }

        // Get total donations if you have a donations table
        const [[donations]] = await db.execute( 'SELECT SUM(amount) as total FROM donations WHERE user_id = ?', [userId]);

        res.json({
            success: true,
            user: {
                id: user.id,
                username: user.username,
                email: user.email
            },
            totalDonations: donations?.total || 0
        });
    } catch (error) {
        console.error('Error in /user route:', error);
        res.status(500).json({ success: false, message: 'Error fetching user data' });
    }
});

router.get('/verify-role', authenticateToken, async (req, res) => {
    try {
        const userId = req.user.id;

        const [[user]] = await db.execute( 'SELECT role FROM users WHERE id = ?', [userId]);

        if (!user) {
            return res.status(403).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, role: user.role });
    } catch (error) {
        console.error('Error in verify-role:', error);
        res.status(500).json({ success: false, message: 'Error verifying role' });
    }
});

router.get('/donees', authenticateToken, require_role('super_admin'), async (req, res) => {
    try {
        const [donees] = await db.execute('SELECT * FROM donation_receivers');

        if(!donees) {
            return res.status(403).json({ success: false, message: 'No information found' });
        }

        res.status(200).json({ success: true, donees: donees });
    } catch (error) {
        console.error('Error in verify-role:', error);
        res.status(500).json({ success: false, message: 'Error verifying role' });
    }
});

router.get('/donations', authenticateToken, require_role('super_admin'), async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
    
        if (!startDate || !endDate) {
            return res.status(400).json({ success: false, error: 'Start date and end date are required' });
        }

        const formatToMySQLDateTime = (date) => {
            const d = new Date(date);
            return d.toISOString().slice(0, 19).replace('T', ' ');
        };

        const start = formatToMySQLDateTime(startDate);
        const end = formatToMySQLDateTime(endDate);

        console.log('Formatted start date:', start);
        console.log('Formatted end date:', end);
        
        if (new Date(startDate) > new Date(endDate)) {
            return res.status(400).json({ success: false, error: 'Start date must be before end date' });
        }

        const [donations] = await db.execute(
            'SELECT * FROM donations WHERE donation_time BETWEEN ? AND ? ORDER BY donation_time DESC', 
            [start, end]
        );

        if(!donations || donations.length === 0) {
            return res.status(403).json({ success: false, message: 'No donations found in this time period' });
        }

        res.status(200).json({ success: true, donations: donations });
    } catch (error) {
        console.error('Error fetching donations:', error);
        res.status(500).json({ success: false, message: 'Error fetching donations' });
    }
});

export default router;
