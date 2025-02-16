import express from 'express'
import db from '../config/db.js';

const router = express.Router(); 


router.post('/donate', async(req, res) => {
    const { user_id, amount } = req.body; 

    if (!user_id || !amount ) {
        return res.status(400).json({ message: 'user_id and amount required.'});
    }
    
    try {
        const [result] = await db.execute( 
            'INSERT INTO donations (user_id, amount) VALUES (?, ?)',
            [user_id, amount]
        ); 
        res.status(200).json({ message: 'Donation recieved!' })
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: 'Donation failed', error: error.message });
    }
});

export default router; 