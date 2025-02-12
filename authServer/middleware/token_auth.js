import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];

    console.log(token);

    if (!token) {
        return res.status(401).json({ success: false, message: 'Not Authorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded.userId) {
            return res.status(401).json({ success: false, message: 'Invalid token payload' });
        }

        req.user = { id: decoded.userId };
        next();
    } catch (error) {
        console.error('JWT verification error:', error);
        return res.status(403).json({ success: false, message: 'Invalid token' });
    }
};

export default authenticateToken;
