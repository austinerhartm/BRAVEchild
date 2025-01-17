const express = require('express');
const router = express.Router();

// Simulated progress value (replace with real data fetching logic as needed)
let progressValue = 0;

// Endpoint to get progress
router.get('/', (req, res) => {
    // Simulate dynamic progress or retrieve it from a database
    progressValue = Math.min(progressValue + 10, 100); // Example increment
    res.json({ progress: progressValue });
});

module.exports = router;
