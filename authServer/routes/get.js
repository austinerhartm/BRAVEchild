const express = require('express');
const router = express.Router();

const db = require('../db');

// Endpoint to get progress
router.get('/progress', async (req, res) => {
    let [sqlTotal] = await db.execute('SELECT SUM(amount) AS amt FROM donations');
    let progressValue = sqlTotal[0].amt;
    res.json({ progress: progressValue });
});

module.exports = router;
