import express from 'express'

const router = express.Router(); 


app.post('/donate', async(req, res) => {
    const { fname, lname, email, amount } = req.body; 

    if (!fname || !lname || !email || !amount) {
        return res.status(400).json({ message: 'first name, last name, email, and amount ar required.'});

    }
    
    try {
        const [result] = await pool.promise().query( 
            'INSERT INTO sponsors (fname, lname, email, amount) VALUES (?, ?, ?, ?)',
            [fname, lname, email, amount]
        ); 
        res.status(200).json({ message: 'Donation recieved!', donorId: result.insertId })
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: 'Donation failed', error: error.message });
    }
});

