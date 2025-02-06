import jwt from 'jsonwebtoken';

const authenticateToken = (req, res, next) => {
    console.log('Cookies received:', req.cookies); // Debug: check cookies

    const { token } = req.cookies;
    if (!token) {
        return res.status(401).json({ success: false, message: 'Not Authorized' });
    }

    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);

        if (!tokenDecode.userId) {
            return res.status(401).json({ success: false, message: 'Invalid token payload' });
        }

        req.user = { id: tokenDecode.userId };
        next();
    } catch (error) {
        console.error('JWT verification error:', error);
        return res.status(403).json({ success: false, message: 'Invalid token' });
    }
};

export default authenticateToken;
