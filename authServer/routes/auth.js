import express from 'express';
import bcrypt from 'bcrypt';
import db from '../config/db.js';
import transporter from '../config/mailer.js';
import jwt from 'jsonwebtoken';
import { authenticateToken } from '../middleware/token_auth.js';

const router = express.Router();

// User registation endpoint
router.post('/registration', async (req, res) => {
	const { username, email, password } = req.body;

	try {
		const [existingUsers] = await db.execute('SELECT * FROM users WHERE username=? OR email=?', [username, email]);

		if (existingUsers.length > 0) {
			return res.status(409).json({ success: false, message: "User already exists" });
		}

		const salt = 10;
		const passwordHash = await bcrypt.hash(password, salt);

		if (exisitingUser.length > 0) {
			return res.status(409).json({ success: false, message: "user already exists" });
		}

		const [result] = await db.execute('INSERT INTO users (username, email, passwordHash) VALUES (?,?,?)', [username, email, passwordHash]);

		const userId = result.insertId;
		try {
			const accessToken = jwt.sign({ userId: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });

			const refreshToken = jwt.sign({ userId: userId }, process.env.REFRESH_SECRET, { expiresIn: '7d' });

			await db.execute('UPDATE users SET refresh_token = ? WHERE id = ?', [refreshToken, userId]);

			return res.status(201).json({ success: true, message: 'User registered successfully', accessToken, refreshToken });
		} catch (tokenError) {
			console.error('Token generation error:', tokenError);
			throw new Error('Token generation failed: ' + tokenError.message);
		}

	} catch (error) {
		console.error('Registration error:', error);
		console.error('Full error object:', JSON.stringify(error, Object.getOwnPropertyNames(error)));

		return res.status(500).json({
			success: false,
			message: 'Error during registration',
			error: error.message,
			...(process.env.NODE_ENV === 'development' && { details: error.stack })
		});
	}
});

// User login endpoint
router.post('/login', async (req, res) => {
	const { username, password } = req.body;

	try {
		const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
		const user = rows[0];

		if (!user) {
			return res.status(401).json({ success: false, message: 'Invalid username or password' });
		}

		const validPass = await bcrypt.compare(password, user.passwordHash);
		if (!validPass) {
			return res.status(401).json({ success: false, message: 'Invalid username or password' });
		}

		const accessToken = jwt.sign({ userId: user.id, role: user.role },process.env.JWT_SECRET,{ expiresIn: '1h' });

		const refreshToken = jwt.sign({ userId: user.id, role: user.role },process.env.REFRESH_SECRET,{ expiresIn: '7d' });

		await db.execute('UPDATE users SET refresh_token = ? WHERE id = ?',[refreshToken, user.id]);

		res.status(200).json({ success: true, accessToken, refreshToken });
	} catch (error) {
		res.status(500).json({ success: false, error: error.message });
	}
});

// User logout endpoint
router.post('/logout', async (req, res) => {
	try {
		const { refreshToken } = req.body;

		if (refreshToken) {
			await db.execute( 'UPDATE users SET refresh_token = NULL WHERE refresh_token = ?', [refreshToken] );
		}

		res.status(200).json({ success: true, message: 'Logged out successfully' });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
});

// Create OTP and send email 
router.post('/verify', authenticateToken, async (req, res) => {
	try {
		const userId = req.user.id;

		const [[user]] = await db.execute('SELECT * FROM users WHERE id=?', [userId]);

		if (!user) {
			return res.status(404).json({ success: false, message: 'User not found' });
		}

		if (user.isAccountVerified) {
			return res.status(409).json({ success: false, message: 'Account is already verified' });
		}

		const otp = String(Math.floor(100000 + Math.random() * 90000));
		const otpExpire = Date.now() + 24 * 60 * 60 * 1000;

		await db.execute('UPDATE users SET verifyOTP = ?, verifyOTPExpire = ? WHERE id = ?', [otp, otpExpire, user.id]);

		const mailOptions = {
			from: process.env.SENDER_EMAIL,
			to: user.email,
			subject: 'Test User Verification',
			text: `Your OTP is ${otp}.`
		};

		await transporter.sendMail(mailOptions);

		res.status(200).json({ success: true, message: 'Verification OTP sent' });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
});



router.post('/verify_email', authenticateToken, async (req, res) => {
	const userId = req.user.id;
	const { otp } = req.body;

	if (!userId || !otp) {
		return res.status(400).json({ success: false, message: 'Missing details' });
	}

	try {
		const [[user]] = await db.execute('SELECT * FROM users WHERE id=?', [userId]);

		if (!user) {
			return res.status(404).json({ success: false, message: 'User not found' });
		}

		if (!user.verifyOTP || user.verifyOTP !== otp) {
			return res.status(400).json({ success: false, message: 'Invalid OTP' });
		}

		if (user.verifyOTPExpire < Date.now()) {
			return res.status(400).json({ success: false, message: 'OTP expired' });
		}

		await db.execute('UPDATE users SET isAccountVerified = ?, verifyOTP = ?, verifyOTPExpire = ? WHERE id = ?', [true, '', 0, user.id]);

		res.status(200).json({ success: true, message: 'Account verified successfully' });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
});

router.post('/is_auth', authenticateToken, async (req, res) => {
	try {
		res.status(200).json({ success: true });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
});

router.post('/reset_otp', authenticateToken, async (req, res) => {
	const { email } = req.body;

	if (!email) {
		return res.status(400).json({ success: false, message: 'Email is required' });
	}

	try {
		const [[user]] = await db.execute('SELECT * FROM users WHERE email=?', [email]);
		if (!user) {
			return res.status(400).json({ success: false, message: 'User not found' });
		}

		const resetOTP = String(Math.floor(100000 + Math.random() * 90000));
		const resetOTPExpire = Date.now() + 15 * 60 * 1000;

		await db.execute('UPDATE users SET resetOTP = ?, resetOTPExpire = ? WHERE id = ?', [resetOTP, resetOTPExpire, user.id]);

		const mailOptions = {
			from: process.env.SENDER_EMAIL,
			to: user.email,
			subject: 'Test Password Reset OTP',
			text: `Your OTP is ${otp}.`
		};

		await transporter.sendMail(mailOptions);

		res.status(200).json({ success: true, message: 'Reset OTP sent to email' });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
});

router.post('/reset_password', authenticateToken, async (req, res) => {
	const { email, otp, newPassword } = req.body;

	if (!email || !otp || !newPassword) {
		return res.status(400).json({ success: false, message: 'Email, otp, and new password is required' });
	}

	try {
		const [[user]] = await db.execute('SELECT * FROM users WHERE email=?', [email]);
		if (!user) {
			return res.status(404).json({ success: false, message: 'User not found' });
		}

		if (user.resetOTP === '' || user.resetOTP !== otp) {
			return res.status(400).json({ success: false, message: 'Invalid otp' });
		}

		if (user.resetOTPExpire < Date.now()) {
			return res.status(400).json({ success: false, message: 'OTP expired' });
		}

		const hashedPassword = await bcrypt.hash(newPassword, salt);

		user.password = hashedPassword;
		user.resetOTP = '';
		user.resetOTPExpire = 0;

		await db.execute('UPDATE users SET passwordHash=? WHERE id = ?', [hashedPassword, user.id]);

		res.status(200).json({ success: true, message: 'Password set successfully' });
	} catch (error) {
		res.status(500).json({ success: false, message: error.message });
	}
});

router.post('/refresh', async (req, res) => {
	const { refreshToken } = req.body;

	if (!refreshToken) {
		return res.status(401).json({ success: false, message: 'No refresh token provided' });
	}

	try {
		const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);

		const [[user]] = await db.execute( 'SELECT * FROM users WHERE id = ? AND refresh_token = ?', [decoded.userId, refreshToken] );

		if (!user) {
			return res.status(403).json({ success: false, message: 'Invalid refresh token' });
		}

		const newAccessToken = jwt.sign({ userId: decoded.userId, role: decoded.role }, process.env.JWT_SECRET, { expiresIn: '1h' } );

		const newRefreshToken = jwt.sign({ userId: decoded.userId, role: decoded.role }, process.env.REFRESH_SECRET, { expiresIn: '7d' } );

		await db.execute( 'UPDATE users SET refresh_token = ? WHERE id = ?', [newRefreshToken, decoded.userId] );

		res.status(200).json({ success: true, accessToken: newAccessToken, refreshToken: newRefreshToken });
	} catch (error) {
		return res.status(403).json({ success: false, message: 'Invalid refresh token' });
	}
});

router.post('/save_tiles', async (req, res) => {
	const { childId, tiles, donator } = req.body;

	if ((!childId && childId !== 0) || !tiles) {
		return res.status(400).json({ success: false, message: 'Id and selected tiles is required' });
	}

	if (!donator) {
		donator = 'ANON';
	}

	try {
		const [[donee_info]] = await db.execute('SELECT * FROM donation_receivers WHERE child_id=?', [childId]);

		if (!donee_info) {
			return res.status(404).json({ success: false, message: 'Donee not found' });
		}

		for (let tile of tiles) {
			await db.execute('INSERT INTO donation_tile_selections (child_id, donator, selected_tile) VALUES (?,?,?)', [childId, donator, tile]);
		}

		res.status(200).json({ success: true, message: 'Connection successful' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: 'Server error' });
	}
});


export default router;
