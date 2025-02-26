import db from '../config/db.js';

export const require_role = (role) => {
    return async (req, res, next) => {
        try {
            const userId = req.user.id;

            const [[user]] = await db.execute('SELECT role FROM users WHERE id = ?', [userId]);

            if (!user) {
                return res.status(404).json({ success: false, message: 'User not found' });
            }

            if (user.role !== role) {
                return res.status(403).json({ success: false, message: 'Unauthorized: Insufficient privileges' });
            }

            next();
        } catch (error) {
            console.error('Role check error:', error);
            return res.status(500).json({ success: false, message: 'Error checking user role' });
        }
    };
};