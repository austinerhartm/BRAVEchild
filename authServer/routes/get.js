import express from 'express';
const router = express.Router();

import db from '../config/db.js';
import authenticateToken from '../middleware/token_auth.js';

// Endpoint to get progress
router.get('/progress', async (req, res) => {
    let [sqlTotal] = await db.execute('SELECT SUM(amount) AS amt FROM donations');
    let progressValue = sqlTotal[0].amt;
    res.json({ progress: progressValue });
});

// Endpoint to fetch tiles
router.get('/tiles', async (req, res) => {
    try {
        const { childId } = req.body;

        if (!childId) {
            return res.status(404).json({ success: false, message: 'No id found' });
        }

        const [blockedTiles] = await db.execute('SELECT selected_tile FROM donation_tile_selections WHERE child_id=?', [childId]);
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

        const [[user]] = await db.execute(`SELECT id, username, email, created_at, isAccountVerified FROM users WHERE id = ?`, [userId]);

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({
            success: true,
            userData: {
                name: user.username,
                isAccountVerified: user.isAccountVerified
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
