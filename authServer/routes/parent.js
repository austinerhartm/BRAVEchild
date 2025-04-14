import express from 'express';
import db from '../config/db.js';

const router = express.Router();

router.get('/parent-dashboard/:parentId', async (req, res) => {
    const { parentId } = req.params;

    try {
        const [parentResult] = await db.execute('SELECT * FROM parents WHERE id = ?', [parentId]);
        console.log("parentID: ", parentId);
        if (parentResult.length === 0) {
            return res.status(404).json({ success: false, message: 'Parent not found' });
        }
        const parent = parentResult[0];
        console.log("parent result ", parentResult);

        const [childResult] = await db.execute('SELECT child_id FROM donation_receivers WHERE child_id = ?', [parent.child_id]);
        const child = childResult.length > 0 ? childResult[0] : null;
        res.json({ success: true, parent, child });

    } catch (error) {
        console.error('Error fetching parent and child details:', error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

export default router;