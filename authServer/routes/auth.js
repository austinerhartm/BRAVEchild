import express from 'express';
import bcrypt from 'bcrypt';
import db from '../config/db.js';
import transporter from '../config/mailer.js';
import jwt from 'jsonwebtoken';
import authenticateToken from '../middleware/token_auth.js';

const router = express.Router();

// User registation endpoint
router.post('/registration', async (req, res) => {
	const { username, email, password } = req.body;

	try {
		const [exisitingUser] = await db.execute('SELECT * FROM users WHERE username=? OR email=?', [username, email]);
		const salt = 10;
		const passwordHash = await bcrypt.hash(password, salt);

		if (exisitingUser.length > 0) {
			return res.status(409).json({ success: false, message: "user already exists" });
		}

		const [result] = await db.execute('INSERT INTO users (username, email, passwordHash) VALUES (?,?,?)', [username, email, passwordHash]);

		const userId = result.insertId;

		const token = jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1d' });
		res.cookie('token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
			maxAge: 1 * 24 * 60 * 60 * 1000
		});

		const mailOptions = {
			from: process.env.SENDER_EMAIL,
			to: email,
			subject: 'test',
			text: 'test text body'
		}

		await transporter.sendMail(mailOptions);

		res.status(201).json({ success: true, message: 'User registered successfully' });
	} catch (error) {
		res.status(500).json({ success: false, error: error.message });
	}
});

// User login endpoint
router.post('/login', async(req, res) => {
	const {username, password } = req.body;

	try {
		const [rows] = await db.execute('SELECT * FROM users WHERE username = ?', [username]);
		const user = rows[0];

		if(!user) {
			return res.status(401).json({ success: false, message: 'Invalid username or password' });
		}

		const validPass = await bcrypt.compare(password, user.passwordHash);
		if(!validPass) {
			return res.status(401).json({ success: false, message: 'Invalid username or password' });
		}

		const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
		res.cookie('token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
			maxAge: 1 * 24 * 60 * 60 * 1000
		});

		res.status(200).json({ success: true, token });
	} catch (error) {
		res.status(500).json({ success: false, error: error.message });
	}
});

// User logout endpoint
router.post('/logout', async (req, res) => {
	try {
		res.clearCookie('token', {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
		})

		res.status(200).json({ success: true, message: 'Logged out' })
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

		console.log(user);
		if (!user) {
			return res.status(404).json({ success: false, message: 'User not found' });
		}

		console.log(user.verifyOTP);
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

router.post('/refresh', (req, res) => {
	const refreshToken = req.cookies.refreshToken;
	if (!refreshToken) return res.status(401).json({ success: false, message: 'Not Authorized' });

	try {
		const decoded = jwt.verify(refreshToken, process.env.REFRESH_SECRET);
		const newToken = generateToken(decoded.userId);
		res.cookie('token', newToken, {
			httpOnly: true,
			secure: true,
			sameSite: 'Strict'
		});
		res.status(200).json({ success: true, token: newToken });
	} catch (error) {
		res.status(403).json({ success: false, message: 'Invalid Refresh Token' });
	}
});


export default router;
