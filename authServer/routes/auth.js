const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db');

const router = express.Router();
const jwt = require('jsonwebtoken');

// User registation endpoint
router.post('/registration', async (req, res) => {
	const { username, email, password } = req.body;

	try {
		const salt = 10;
		const passwordHash = await bcrypt.hash(password, salt);

		const [result] = await db.execute('INSERT INTO users (username, email, passwordHash, role) VALUES (?,?,?,?)', [username, email, passwordHash]);

		res.status(201).json({ message: 'User registered successfully' });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

// User login endpoint
router.post('/login', async(req, res) => {
	const {username, password } = req.body;

	try {
		const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
		const user = rows[0];

		if(!user) {
			return res.status(401).json({ message: 'Invalid username or password' });
		}

		const validPass = await bcrypt.compare(password, user.passwordHash);
		if(!validPass) {
			return res.status(401).json({ message: 'Invalid username or password' });
		}

		const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

		res.status(200).json({ token });
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

module.exports = router;
