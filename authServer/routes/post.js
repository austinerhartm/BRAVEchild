import express from 'express';
import db from '../config/db.js';
import { nanoid } from 'nanoid';
import transporter from '../config/mailer.js';
import jwt from 'jsonwebtoken';
import { authenticateToken } from '../middleware/token_auth.js';
import { require_role } from '../middleware/require_role.js';

const router = express.Router();

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

		res.status(200).json({ success: true, message: 'Tiles updated' });
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: 'Server error' });
	}
});

router.post('/create_donee', authenticateToken, require_role('super_admin'), async (req, res) => {
	const { name } = req.body;

	if (!name) {
		return res.status(400).json({ success: false, message: 'Name is required' });
	}

	const [[alreadyExist]] = await db.execute('SELECT * FROM donation_receivers WHERE child_name=?', [name]);

	if (!name) {
		return res.status(400).json({ success: false, message: 'Name is required' });
	}

	if (alreadyExist) {
		return res.status(409).json({ success: false, message: "Donee already exists" });
	}

	try {
		await db.execute('INSERT INTO donation_receivers (child_name) VALUES (?)', [name]);
		return res.status(200).json({ success: true, message: 'Added donee' });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ success: false, message: 'Server error' });
	}
});

router.post('/remove_donee', authenticateToken, require_role('super_admin'), async (req, res) => {
	const { name } = req.body;

	if (!name) {
		return res.status(400).json({ success: false, message: 'Name is required' });
	}

	const [[alreadyExist]] = await db.execute('SELECT * FROM donation_receivers WHERE child_name=?', [name]);

	if (!name) {
		return res.status(400).json({ success: false, message: 'Name is required' });
	}

	if (!alreadyExist) {
		return res.status(409).json({ success: false, message: "Donee does not exist" });
	}

	try {
		await db.execute('DELETE FROM donation_receivers WHERE child_name=?', [name]);
		return res.status(200).json({ success: true, message: 'Removed donee' });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ success: false, message: 'Server error' });
	}
});

router.post('/create_link', require_role('super_admin'), async (req, res) => {
	try {
		const { doneeId } = req.body;

		const [[existingDonee]] = await db.execute('SELECT * FROM donation_receivers WHERE child_id = ?', [doneeId]);

		if (!existingDonee) {
			return res.status(404).json({ success: false, message: 'Donee not found' });
		}

		const linkId = nanoid(10);

		const [[existingLink]] = await db.execute('SELECT link FROM donation_receivers WHERE link=?', [linkId]);

		if (existingLink) {
			return res.status(409).json({ success: false, message: "Link exists" });
		}

		await db.execute('UPDATE donation_receivers SET link=?, WHERE child_id=?', [linkId, doneeId]);

		const donationUrl = `${process.env.FRONTEND_URL}/donate/${linkId}`;

		return res.json({ success: true, donationUrl, linkId });
	} catch (error) {
		console.error('Error generating donee link:', error);
		return res.status(500).json({ success: false, message: 'Error generating donation link' });
	}
});

export default router;