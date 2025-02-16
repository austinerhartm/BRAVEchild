import express from 'express';
import db from '../config/db.js';
import { nanoid } from 'nanoid';
import { authenticateToken } from '../middleware/token_auth.js';
import { require_role } from '../middleware/require_role.js';

const router = express.Router();

router.post('/save_tiles', async (req, res) => {
	const { link, tiles, donator } = req.body;

	if (!link || !tiles) {
		return res.status(400).json({ success: false, message: 'Id and selected tiles is required' });
	}

	if (!donator) {
		donator = 'ANON';
	}

	try {
		const [[donee_info]] = await db.execute('SELECT * FROM donation_receivers WHERE link=?', [link]);

		if (!donee_info) {
			return res.status(404).json({ success: false, message: 'Donee not found' });
		}

		for (let tile of tiles) {
			await db.execute('INSERT INTO donation_tile_selections (child_id, donator, selected_tile) VALUES (?,?,?)', [donee_info.child_id, donator, tile]);
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

    try {
        const [[alreadyExist]] = await db.execute('SELECT * FROM donation_receivers WHERE child_name = ?', [name]);

        if (alreadyExist) {
            return res.status(409).json({ success: false, message: "Donee already exists" });
        }

        const link = nanoid(21);

        await db.execute('INSERT INTO donation_receivers (child_name, link) VALUES (?, ?)', [name, link]);


        return res.status(200).json({ success: true, message: 'Added donee' });

    } catch (error) {
        console.error('Error creating donee:', error);
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

export default router;